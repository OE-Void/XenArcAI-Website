/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useRef, useCallback } from "react";

export const CHANNEL = "ORCHIDS_HOVER_v1" as const;
const VISUAL_EDIT_MODE_KEY = "orchids_visual_edit_mode" as const;
const FOCUSED_ELEMENT_KEY = "orchids_focused_element" as const;

// Deduplicate helper for high-frequency traffic (HIT / FOCUS_MOVED / SCROLL)
// -----------------------------------------------------------------------------
let _orchidsLastMsg = "";
const postMessageDedup = (data: any) => {
  try {
    const key = JSON.stringify(data);
    if (key === _orchidsLastMsg) return; // identical – drop
    _orchidsLastMsg = key;
  } catch {
    // if stringify fails, fall through
  }
  window.parent.postMessage(data, "*");
};

export type ParentToChild =
  | { type: typeof CHANNEL; msg: "POINTER"; x: number; y: number }
  | { type: typeof CHANNEL; msg: "VISUAL_EDIT_MODE"; active: boolean }
  | { type: typeof CHANNEL; msg: "SCROLL"; dx: number; dy: number }
  | { type: typeof CHANNEL; msg: "CLEAR_INLINE_STYLES"; elementId: string }
  | {
      type: typeof CHANNEL;
      msg: "PREVIEW_FONT";
      elementId: string;
      fontFamily: string;
    }
  | {
      type: typeof CHANNEL;
      msg: "RESIZE_ELEMENT";
      elementId: string;
      width: number;
      height: number;
    }
  | {
      type: typeof CHANNEL;
      msg: "SHOW_ELEMENT_HOVER";
      elementId: string | null;
    };

export type ChildToParent =
  | {
      type: typeof CHANNEL;
      msg: "HIT";
      id: string | null;
      tag: string | null;
      rect: { top: number; left: number; width: number; height: number } | null;
    }
  | {
      type: typeof CHANNEL;
      msg: "ELEMENT_CLICKED";
      id: string | null;
      tag: string | null;
      rect: { top: number; left: number; width: number; height: number };
      clickPosition: { x: number; y: number };
      isEditable?: boolean;
      currentStyles?: {
        fontSize?: string;
        color?: string;
        fontWeight?: string;
        fontStyle?: string;
        textDecoration?: string;
        textAlign?: string;
        lineHeight?: string;
        letterSpacing?: string;
        paddingLeft?: string;
        paddingRight?: string;
        paddingTop?: string;
        paddingBottom?: string;
        marginLeft?: string;
        marginRight?: string;
        marginTop?: string;
        marginBottom?: string;
        backgroundColor?: string;
        backgroundImage?: string;
        borderRadius?: string;
        fontFamily?: string;
        opacity?: string;
        display?: string;
        flexDirection?: string;
        alignItems?: string;
        justifyContent?: string;
        gap?: string;
      };
      className?: string;
      src?: string;
    }
  | { type: typeof CHANNEL; msg: "SCROLL_STARTED" }
  | { type: typeof CHANNEL; msg: "SCROLL_STOPPED" }
  | {
      type: typeof CHANNEL;
      msg: "TEXT_CHANGED";
      id: string;
      oldText: string;
      newText: string;
      filePath: string;
      line: number;
      column: number;
    }
  | {
      type: typeof CHANNEL;
      msg: "STYLE_CHANGED";
      id: string;
      styles: Record<string, string>;
      filePath: string;
      line: number;
      column: number;
    }
  | {
      type: typeof CHANNEL;
      msg: "STYLE_BLUR";
      id: string;
      styles: Record<string, string>;
      filePath: string;
      line: number;
      column: number;
      className: string;
    }
  | {
      type: typeof CHANNEL;
      msg: "IMAGE_BLUR";
      id: string;
      oldSrc: string;
      newSrc: string;
      filePath: string;
      line: number;
      column: number;
    }
  | {
      type: typeof CHANNEL;
      msg: "FOCUS_MOVED";
      id: string;
      rect: { top: number; left: number; width: number; height: number };
    }
  | { type: typeof CHANNEL; msg: "VISUAL_EDIT_MODE_ACK"; active: boolean }
  | { type: typeof CHANNEL; msg: "VISUAL_EDIT_MODE_RESTORED"; active: boolean };

type Box = null | { top: number; left: number; width: number; height: number };

const BOX_PADDING = 4; // Pixels to expand the box on each side

// Helper to check if element can be made contentEditable
const isTextEditable = (element: HTMLElement): boolean => {
  const tagName = element.tagName.toLowerCase();
  // Elements that typically contain text and can be made contentEditable
  const editableTags = [
    "p",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "span",
    "div",
    "li",
    "td",
    "th",
    "label",
    "a",
    "button",
  ];

  // Check if it's already contentEditable or an input/textarea
  if (
    element.contentEditable === "true" ||
    tagName === "input" ||
    tagName === "textarea"
  ) {
    return true;
  }

  // Allow editing if element contains text and is an editable tag
  // Only allow editing if element has at most 1 child OR has direct text content
  if (editableTags.includes(tagName) && element.textContent?.trim()) {
    // Check if element has direct text nodes (not just text from children)
    const hasDirectText = Array.from(element.childNodes).some(
      (node) => node.nodeType === Node.TEXT_NODE && node.textContent?.trim()
    );

    // Allow editing if:
    // 1. Element has no children (pure text element)
    // 2. Element has 1 or fewer children AND has direct text content
    if (
      element.childElementCount === 0 ||
      (element.childElementCount <= 1 && hasDirectText)
    ) {
      return true;
    }
  }

  return false;
};

// Helper to extract only text nodes from an element (excluding child element text)
const extractDirectTextContent = (element: HTMLElement): string => {
  let text = "";
  for (const node of element.childNodes) {
    if (node.nodeType === Node.TEXT_NODE) {
      text += node.textContent || "";
    }
  }
  return text;
};

// Helper to parse data-orchids-id to extract file path, line, and column
const parseOrchidsId = (
  orchidsId: string
): { filePath: string; line: number; column: number } | null => {
  // Format: "filepath:line:column"
  const parts = orchidsId.split(":");
  if (parts.length < 3) return null;

  // The file path might contain colons, so we need to handle that
  const column = parseInt(parts.pop() || "0");
  const line = parseInt(parts.pop() || "0");
  const filePath = parts.join(":"); // Rejoin the remaining parts as the file path

  if (isNaN(line) || isNaN(column)) return null;

  return { filePath, line, column };
};

// Helper to get current styles of an element (including inline styles)
const getCurrentStyles = (
  element: HTMLElement
): {
  fontSize?: string;
  color?: string;
  fontWeight?: string;
  fontStyle?: string;
  textDecoration?: string;
  textAlign?: string;
  lineHeight?: string;
  letterSpacing?: string;
  paddingLeft?: string;
  paddingRight?: string;
  paddingTop?: string;
  paddingBottom?: string;
  marginLeft?: string;
  marginRight?: string;
  marginTop?: string;
  marginBottom?: string;
  backgroundColor?: string;
  backgroundImage?: string;
  borderRadius?: string;
  fontFamily?: string;
  opacity?: string;
  display?: string;
  flexDirection?: string;
  alignItems?: string;
  justifyContent?: string;
  gap?: string;
} => {
  const computed = window.getComputedStyle(element);

  // Helper to normalize values and provide defaults
  const normalizeValue = (value: string, property: string): string => {
    // Handle background color - if it's transparent or rgba(0,0,0,0), return "transparent"
    if (property === "backgroundColor") {
      if (
        value === "rgba(0, 0, 0, 0)" ||
        value === "rgb(0, 0, 0, 0)" ||
        value === "transparent" ||
        value === ""
      ) {
        return "transparent";
      }
    }

    // Handle background image - if none, return "none"
    if (property === "backgroundImage" && (value === "none" || value === "")) {
      return "none";
    }

    // Handle text decoration - if none, return "none"
    if (property === "textDecoration") {
      // Some browsers return complex values like "none solid rgb(0, 0, 0)"
      if (value.includes("none") || value === "") {
        return "none";
      }
    }

    // Handle font style - if normal, return "normal"
    if (property === "fontStyle" && (value === "normal" || value === "")) {
      return "normal";
    }

    // Handle font weight - normalize to standard values
    if (property === "fontWeight") {
      const weight = parseInt(value);
      if (!isNaN(weight)) {
        return String(weight);
      }
      return value || "400";
    }

    // Handle opacity - if 1, return "1"
    if (property === "opacity" && (value === "1" || value === "")) {
      return "1";
    }

    // Handle spacing values (padding/margin) - if 0px, return "0"
    if (
      (property.includes("padding") || property.includes("margin")) &&
      (value === "0px" || value === "0")
    ) {
      return "0";
    }

    // Handle border radius - if 0px, return "0"
    if (property === "borderRadius" && (value === "0px" || value === "0")) {
      return "0";
    }

    // Handle letter spacing - if normal, return "normal"
    if (
      property === "letterSpacing" &&
      (value === "normal" || value === "0px")
    ) {
      return "normal";
    }

    // Handle gap - if normal, return "normal"
    if (property === "gap" && (value === "normal" || value === "0px")) {
      return "normal";
    }

    return value;
  };

  return {
    fontSize: normalizeValue(computed.fontSize, "fontSize"),
    color: normalizeValue(computed.color, "color"),
    fontWeight: normalizeValue(computed.fontWeight, "fontWeight"),
    fontStyle: normalizeValue(computed.fontStyle, "fontStyle"),
    textDecoration: normalizeValue(computed.textDecoration, "textDecoration"),
    textAlign: normalizeValue(computed.textAlign, "textAlign"),
    lineHeight: normalizeValue(computed.lineHeight, "lineHeight"),
    letterSpacing: normalizeValue(computed.letterSpacing, "letterSpacing"),
    paddingLeft: normalizeValue(computed.paddingLeft, "paddingLeft"),
    paddingRight: normalizeValue(computed.paddingRight, "paddingRight"),
    paddingTop: normalizeValue(computed.paddingTop, "paddingTop"),
    paddingBottom: normalizeValue(computed.paddingBottom, "paddingBottom"),
    marginLeft: normalizeValue(computed.marginLeft, "marginLeft"),
    marginRight: normalizeValue(computed.marginRight, "marginRight"),
    marginTop: normalizeValue(computed.marginTop, "marginTop"),
    marginBottom: normalizeValue(computed.marginBottom, "marginBottom"),
    backgroundColor: normalizeValue(
      computed.backgroundColor,
      "backgroundColor"
    ),
    backgroundImage: normalizeValue(
      computed.backgroundImage,
      "backgroundImage"
    ),
    borderRadius: normalizeValue(computed.borderRadius, "borderRadius"),
    fontFamily: normalizeValue(computed.fontFamily, "fontFamily"),
    opacity: normalizeValue(computed.opacity, "opacity"),
    display: normalizeValue(computed.display, "display"),
    flexDirection: normalizeValue(computed.flexDirection, "flexDirection"),
    alignItems: normalizeValue(computed.alignItems, "alignItems"),
    justifyContent: normalizeValue(computed.justifyContent, "justifyContent"),
    gap: normalizeValue(computed.gap, "gap"),
  };
};

// Normalize image src for comparison (handles Next.js optimization wrappers)
const normalizeImageSrc = (input: string): string => {
  if (!input) return "";
  try {
    const url = new URL(input, window.location.origin);
    // Handle Next.js <Image> optimization wrapper
    if (url.pathname === "/_next/image") {
      const real = url.searchParams.get("url");
      if (real) return decodeURIComponent(real);
    }
    return url.href; // absolute form
  } catch {
    return input;
  }
};

// Helper to wrap multiline text only when it contains line breaks
const wrapMultiline = (text: string): string => {
  if (text.includes("\n")) {
    const escaped = text.replace(/\n/g, "\\n");
    // Wrap in {` ... `} so JSX will interpret it as a template literal
    return `{\`${escaped}\`}`;
  }
  return text;
};

export default function HoverReceiver() {
  const [hoverBox, setHoverBox] = useState<Box>(null);
  const [hoverBoxes, setHoverBoxes] = useState<Box[]>([]);
  const [focusBox, setFocusBox] = useState<Box>(null);
  const [focusedElementId, setFocusedElementId] = useState<string | null>(null);
  const [isVisualEditMode, setIsVisualEditMode] = useState(() => {
    // Initialize from localStorage if available
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(VISUAL_EDIT_MODE_KEY);
      return stored === "true";
    }
    return false;
  });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState<string | null>(null);
  const [resizeStart, setResizeStart] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  // Tag labels for hover and focus overlays
  const [hoverTag, setHoverTag] = useState<string | null>(null);
  const [focusTag, setFocusTag] = useState<string | null>(null);
  const isResizingRef = useRef(false);
  const lastHitElementRef = useRef<HTMLElement | null>(null);
  const lastHitIdRef = useRef<string | null>(null);
  const focusedElementRef = useRef<HTMLElement | null>(null);
  const isVisualEditModeRef = useRef(false);
  const scrollTimeoutRef = useRef<number | null>(null);
  const originalContentRef = useRef<string>("");
  const originalSrcRef = useRef<string>(""); // track original img src
  const focusedImageElementRef = useRef<HTMLImageElement | null>(null); // track the actual img element
  const editingElementRef = useRef<HTMLElement | null>(null);
  const wasEditableRef = useRef<boolean>(false);
  const styleElementRef = useRef<HTMLStyleElement | null>(null);
  const appliedStylesRef = useRef<Map<string, Record<string, string>>>(
    new Map()
  );
  const hasStyleChangesRef = useRef<boolean>(false);
  const lastClickTimeRef = useRef<number>(0);

  // Cache of loaded fonts
  const loadedFontFamilies = useRef<Set<string>>(new Set());
  // Map of elementId that already has a persistent font set
  const persistentFontMap = useRef<Map<string, string>>(new Map());
  // Timeout refs for clearing persistent font map
  const persistentFontTimeouts = useRef<Map<string, number>>(new Map());

  // Keep ref in sync with state and persist to localStorage
  useEffect(() => {
    isVisualEditModeRef.current = isVisualEditMode;
    // Persist to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem(VISUAL_EDIT_MODE_KEY, String(isVisualEditMode));
    }
  }, [isVisualEditMode]);

  // On mount, notify parent if visual edit mode was restored from localStorage
  useEffect(() => {
    if (isVisualEditMode) {
      // Send acknowledgement to parent that visual edit mode is active
      // This will sync the parent's state with our restored state
      window.parent.postMessage(
        { type: CHANNEL, msg: "VISUAL_EDIT_MODE_ACK", active: true },
        "*"
      );

      // Also send a special message to indicate this was restored from localStorage
      window.parent.postMessage(
        { type: CHANNEL, msg: "VISUAL_EDIT_MODE_RESTORED", active: true },
        "*"
      );

      // Restore focused element after a short delay to ensure DOM is ready
      setTimeout(() => {
        if (typeof window !== "undefined") {
          // Restore focused element
          const focusedData = localStorage.getItem(FOCUSED_ELEMENT_KEY);
          if (focusedData) {
            try {
              const { id } = JSON.parse(focusedData);
              const element = document.querySelector(
                `[data-orchids-id="${id}"]`
              ) as HTMLElement;

              if (element) {
                // Simulate a click on the element to restore focus
                const rect = element.getBoundingClientRect();
                const clickEvent = new MouseEvent("click", {
                  clientX: rect.left + rect.width / 2,
                  clientY: rect.top + rect.height / 2,
                  bubbles: true,
                  cancelable: true,
                });
                element.dispatchEvent(clickEvent);
              }
            } catch {
              // Ignore parsing errors
            }
          }
        }
      }, 500); // Wait 500ms for DOM to be fully ready
    }
  }, []); // Run only on mount

  // Helper function to expand box dimensions
  const expandBox = (rect: DOMRect): Box => ({
    top: rect.top - BOX_PADDING,
    left: rect.left - BOX_PADDING,
    width: rect.width + BOX_PADDING * 2,
    height: rect.height + BOX_PADDING * 2,
  });

  // Helper to update focus box position
  const updateFocusBox = useCallback(() => {
    if (focusedElementRef.current) {
      const r = focusedElementRef.current.getBoundingClientRect();
      setFocusBox(expandBox(r));
    }
  }, []);

  // Add global styles for contentEditable elements
  useEffect(() => {
    if (isVisualEditMode && !styleElementRef.current) {
      const style = document.createElement("style");
      style.textContent = `
        [contenteditable="true"]:focus {
          outline: none !important;
          box-shadow: none !important;
          border-color: inherit !important;
        }
        [contenteditable="true"] {
          cursor: text !important;
        }
        /* Prevent the default blue highlight on contenteditable */
        [contenteditable="true"]::selection {
          background-color: rgba(59, 130, 246, 0.3);
        }
        [contenteditable="true"]::-moz-selection {
          background-color: rgba(59, 130, 246, 0.3);
        }
        /* Prevent child elements from being editable */
        [contenteditable="true"] [contenteditable="false"] {
          user-select: none !important;
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
          opacity: 0.7 !important;
          cursor: default !important;
        }
        /* Ensure protected elements can't be selected */
        [data-orchids-protected="true"] {
          user-select: none !important;
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
        }
      `;
      document.head.appendChild(style);
      styleElementRef.current = style;
    } else if (!isVisualEditMode && styleElementRef.current) {
      styleElementRef.current.remove();
      styleElementRef.current = null;
    }

    return () => {
      if (styleElementRef.current) {
        styleElementRef.current.remove();
        styleElementRef.current = null;
      }
    };
  }, [isVisualEditMode]);

  // Helper to make only text nodes editable and protect child elements
  const protectChildElements = (element: HTMLElement) => {
    // Make all child elements non-editable
    const childElements = element.querySelectorAll("*");
    childElements.forEach((child) => {
      const childEl = child as HTMLElement;
      childEl.contentEditable = "false";
      // Add a data attribute to mark protected elements
      childEl.setAttribute("data-orchids-protected", "true");
      // Only prevent text selection within the child elements when parent is being edited
      // But still allow pointer events for hovering and clicking
      childEl.style.userSelect = "none";
      childEl.style.webkitUserSelect = "none";
      // Don't set pointerEvents to none - we want to allow hover and click
    });
  };

  // Helper to restore child elements after editing
  const restoreChildElements = useCallback((element: HTMLElement) => {
    const protectedElements = element.querySelectorAll(
      '[data-orchids-protected="true"]'
    );
    protectedElements.forEach((child) => {
      const childEl = child as HTMLElement;
      childEl.removeAttribute("contenteditable");
      childEl.removeAttribute("data-orchids-protected");
      // Restore original styles
      childEl.style.userSelect = "";
      childEl.style.webkitUserSelect = "";
    });
  }, []);

  // Handle text changes and send to parent
  const handleTextChange = useCallback((element: HTMLElement) => {
    // Double-check this is still the editing element to avoid stale closures
    if (element !== editingElementRef.current) {
      console.warn("Attempting to handle text change for non-editing element");
      return;
    }

    // Get the orchids ID from the element to ensure we're working with the right one
    const orchidsId = element.getAttribute("data-orchids-id");
    if (!orchidsId) return;

    // For elements with children, only extract direct text content
    let newText: string;
    let oldText: string;

    if (element.childElementCount > 0) {
      // Element has children - only track direct text nodes
      newText = extractDirectTextContent(element);
      // We need to compare against the original direct text content
      // Since originalContentRef stores the full text, we need to handle this differently
      oldText = originalContentRef.current;
    } else {
      // No children - use innerText to preserve line breaks
      newText = element.innerText || element.textContent || "";
      oldText = originalContentRef.current;
    }

    if (newText !== oldText) {
      const parsed = parseOrchidsId(orchidsId);
      if (!parsed) return;

      // Send text change message to parent
      const msg: ChildToParent = {
        type: CHANNEL,
        msg: "TEXT_CHANGED",
        id: orchidsId,
        oldText: wrapMultiline(oldText),
        newText: wrapMultiline(newText),
        filePath: parsed.filePath,
        line: parsed.line,
        column: parsed.column,
      };

      postMessageDedup(msg);

      // Update the original content reference
      originalContentRef.current = newText;
    }
  }, []);

  // Handle style changes and send to parent
  const handleStyleChange = useCallback((
    element: HTMLElement,
    styles: Record<string, string>
  ) => {
    const orchidsId = element.getAttribute("data-orchids-id");
    if (!orchidsId) return;

    const parsed = parseOrchidsId(orchidsId);
    if (!parsed) return;

    // Find ALL elements with the same orchids ID
    const allMatchingElements = document.querySelectorAll(
      `[data-orchids-id="${orchidsId}"]`
    ) as NodeListOf<HTMLElement>;

    // Apply styles to ALL matching elements for visual feedback
    allMatchingElements.forEach((el) => {
      Object.entries(styles).forEach(([property, value]) => {
        // Convert camelCase to kebab-case for CSS property names
        const cssProp = property.replace(/([A-Z])/g, "-$1").toLowerCase();

        // Handle special cases for default values
        let finalValue = value;

        // If backgroundColor is being set to transparent, use transparent keyword
        if (
          property === "backgroundColor" &&
          (value === "transparent" ||
            value === "rgba(0, 0, 0, 0)" ||
            value === "rgb(0, 0, 0, 0)")
        ) {
          finalValue = "transparent";
        }

        // If removing styles (setting to default), remove the property
        if (
          (property === "backgroundColor" && finalValue === "transparent") ||
          (property === "backgroundImage" && value === "none") ||
          (property === "textDecoration" && value === "none") ||
          (property === "fontStyle" && value === "normal") ||
          (property === "opacity" && value === "1") ||
          ((property.includes("padding") || property.includes("margin")) &&
            value === "0") ||
          (property === "borderRadius" && value === "0") ||
          (property === "letterSpacing" && value === "normal") ||
          (property === "gap" && value === "normal")
        ) {
          // Remove the property to let the stylesheet value show through
          el.style.removeProperty(cssProp);
        } else {
          // Apply with !important so it overrides existing rules
          el.style.setProperty(cssProp, finalValue, "important");
        }
      });
    });

    // Store the applied styles
    const existingStyles = appliedStylesRef.current.get(orchidsId) || {};
    appliedStylesRef.current.set(orchidsId, { ...existingStyles, ...styles });
    hasStyleChangesRef.current = true;

    // Update the focus box after style change
    requestAnimationFrame(() => {
      updateFocusBox();
    });

    // Don't send to parent yet - wait for blur
  }, [updateFocusBox]);

  // Send style changes on blur
  const handleStyleBlur = useCallback((element: HTMLElement) => {
    if (!hasStyleChangesRef.current) return;

    const orchidsId = element.getAttribute("data-orchids-id");
    if (!orchidsId) return;

    const parsed = parseOrchidsId(orchidsId);
    if (!parsed) return;

    const appliedStyles = appliedStylesRef.current.get(orchidsId);
    if (!appliedStyles || Object.keys(appliedStyles).length === 0) return;

    // Get className for breakpoint detection
    const className = element.getAttribute("class") || "";

    // Send style blur message to parent for Tailwind conversion
    const msg: ChildToParent = {
      type: CHANNEL,
      msg: "STYLE_BLUR",
      id: orchidsId,
      styles: appliedStyles,
      className,
      filePath: parsed.filePath,
      line: parsed.line,
      column: parsed.column,
    };

    postMessageDedup(msg);

    // Reset style changes flag
    hasStyleChangesRef.current = false;
  }, []);

  // Flush image src updates on blur/focus change
  const flushImageSrcChange = () => {
    // Use the stored image element reference if available
    const imgElement = focusedImageElementRef.current;
    if (!imgElement) return;

    const orchidsId = imgElement.getAttribute("data-orchids-id");
    if (!orchidsId) return;

    const parsed = parseOrchidsId(orchidsId);
    if (!parsed) return;

    const newSrc = normalizeImageSrc(imgElement.src);
    const oldSrc = normalizeImageSrc(originalSrcRef.current);

    if (!newSrc || newSrc === oldSrc) return; // nothing changed

    const msg: ChildToParent = {
      type: CHANNEL,
      msg: "IMAGE_BLUR",
      id: orchidsId,
      oldSrc,
      newSrc,
      filePath: parsed.filePath,
      line: parsed.line,
      column: parsed.column,
    };

    postMessageDedup(msg);

    originalSrcRef.current = newSrc; // reset baseline
    focusedImageElementRef.current = null; // clear reference
  };

  // Listen for style and image updates from parent
  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      if (e.data?.type === "ORCHIDS_STYLE_UPDATE") {
        const { elementId, styles } = e.data;

        // Find ALL elements with the same orchids ID
        const allMatchingElements = document.querySelectorAll(
          `[data-orchids-id="${elementId}"]`
        ) as NodeListOf<HTMLElement>;

        if (allMatchingElements.length > 0) {
          // If fontFamily is present ensure stylesheet loaded first
          const fam = styles.fontFamily || styles["fontFamily"];
          if (fam) {
            const familyKey = fam.replace(/['\s]+/g, "+");
            if (!loadedFontFamilies.current.has(familyKey)) {
              const link = document.createElement("link");
              link.rel = "stylesheet";
              link.href = `https://fonts.googleapis.com/css2?family=${familyKey}:wght@400&display=swap`;
              document.head.appendChild(link);
              loadedFontFamilies.current.add(familyKey);
            }
          }

          // If fontFamily made persistent via style update, remember so previews don't override
          if (fam) {
            persistentFontMap.current.set(elementId, fam);

            // Clear any existing timeout
            const existingTimeout =
              persistentFontTimeouts.current.get(elementId);
            if (existingTimeout) {
              clearTimeout(existingTimeout);
            }

            // Set timeout to clear persistent font after 2 seconds, allowing previews again
            const timeoutId = window.setTimeout(() => {
              persistentFontMap.current.delete(elementId);
              persistentFontTimeouts.current.delete(elementId);
            }, 2000);

            persistentFontTimeouts.current.set(elementId, timeoutId);
          }

          // Apply styles to ALL matching elements
          allMatchingElements.forEach((element) => {
            // Only update handleStyleChange for the focused element to track changes
            if (focusedElementRef.current === element) {
              handleStyleChange(element, styles);
            } else {
              // For other elements, apply styles directly
              Object.entries(styles).forEach(([property, value]) => {
                const cssProp = property
                  .replace(/([A-Z])/g, "-$1")
                  .toLowerCase();

                // Handle special cases for default values
                let finalValue = String(value);

                // If backgroundColor is being set to transparent, use transparent keyword
                if (
                  property === "backgroundColor" &&
                  (value === "transparent" ||
                    value === "rgba(0, 0, 0, 0)" ||
                    value === "rgb(0, 0, 0, 0)")
                ) {
                  finalValue = "transparent";
                }

                // If removing styles (setting to default), remove the property
                if (
                  (property === "backgroundColor" &&
                    finalValue === "transparent") ||
                  (property === "backgroundImage" && value === "none") ||
                  (property === "textDecoration" && value === "none") ||
                  (property === "fontStyle" && value === "normal") ||
                  (property === "opacity" && value === "1") ||
                  ((property.includes("padding") ||
                    property.includes("margin")) &&
                    value === "0") ||
                  (property === "borderRadius" && value === "0") ||
                  (property === "letterSpacing" && value === "normal") ||
                  (property === "gap" && value === "normal")
                ) {
                  // Remove the property to let the stylesheet value show through
                  element.style.removeProperty(cssProp);
                } else {
                  element.style.setProperty(cssProp, finalValue, "important");
                }
              });
            }
          });
        }
      } else if (e.data?.type === "ORCHIDS_IMAGE_UPDATE") {
        const { elementId, src, oldSrc } = e.data;
        let element: HTMLImageElement | null = null;
        const candidates = document.querySelectorAll(
          `[data-orchids-id="${elementId}"]`
        );
        candidates.forEach((el) => {
          if (el.tagName.toLowerCase() === "img") {
            const img = el as HTMLImageElement;
            const norm = normalizeImageSrc(img.src);
            if (!element) element = img; // first fallback
            if (oldSrc && normalizeImageSrc(oldSrc) === norm) {
              element = img;
            }
          }
        });

        if (!element) return;

        if ((element as HTMLElement).tagName.toLowerCase() === "img") {
          const imgEl = element as HTMLImageElement;

          {
            /*
             * Clear any existing responsive sources so the newly uploaded image
             * always displays.  Some frameworks (e.g. Next.js) add a `srcset`
             * attribute which can override `src` in certain viewport/device
             * scenarios, so we strip it out before setting the new source.
             */
            imgEl.removeAttribute("srcset");
            imgEl.srcset = "";

            imgEl.src = src;

            // Update baseline src so flush doesn't treat this as pending change
            originalSrcRef.current = normalizeImageSrc(src);
            focusedImageElementRef.current = imgEl;

            imgEl.onload = () => updateFocusBox();
          }
        }
      } else if (e.data?.type === "RESIZE_ELEMENT") {
        const { elementId, width, height } = e.data;
        const element = document.querySelector(
          `[data-orchids-id="${elementId}"]`
        ) as HTMLElement;

        if (element && focusedElementRef.current === element) {
          // Apply temporary resize styles
          element.style.setProperty("width", `${width}px`, "important");
          element.style.setProperty("height", `${height}px`, "important");

          // Update focus box
          updateFocusBox();
        }
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [handleStyleChange, updateFocusBox]);

  // Handle resize
  const handleResizeStart = (e: React.MouseEvent, handle: string) => {
    if (!focusedElementRef.current) return;

    e.preventDefault();
    e.stopPropagation();

    const rect = focusedElementRef.current.getBoundingClientRect();

    // Clear any hover overlay when starting resize
    setHoverBox(null);
    lastHitElementRef.current = null;

    // Disable pointer events on body to prevent hover detection
    document.body.style.pointerEvents = "none";
    // Keep resize handles interactive
    const resizeHandles = document.querySelectorAll(".resize-handle");
    resizeHandles.forEach((handle) => {
      (handle as HTMLElement).style.pointerEvents = "auto";
    });

    setIsResizing(true);
    isResizingRef.current = true;
    setResizeHandle(handle);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: rect.width,
      height: rect.height,
    });
  };

  // Handle resize move
  useEffect(() => {
    if (
      !isResizing ||
      !resizeStart ||
      !resizeHandle ||
      !focusedElementRef.current
    )
      return;

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - resizeStart.x;
      const dy = e.clientY - resizeStart.y;

      let newWidth = resizeStart.width;
      let newHeight = resizeStart.height;

      // Calculate new dimensions based on handle
      if (resizeHandle.includes("e")) newWidth = resizeStart.width + dx;
      if (resizeHandle.includes("w")) newWidth = resizeStart.width - dx;
      if (resizeHandle.includes("s")) newHeight = resizeStart.height + dy;
      if (resizeHandle.includes("n")) newHeight = resizeStart.height - dy;

      // Get parent container for constraints
      const parent = focusedElementRef.current?.parentElement;
      if (parent) {
        const parentRect = parent.getBoundingClientRect();
        const parentStyles = window.getComputedStyle(parent);
        const parentPaddingLeft = parseFloat(parentStyles.paddingLeft) || 0;
        const parentPaddingRight = parseFloat(parentStyles.paddingRight) || 0;
        const parentPaddingTop = parseFloat(parentStyles.paddingTop) || 0;
        const parentPaddingBottom = parseFloat(parentStyles.paddingBottom) || 0;

        const maxWidth =
          parentRect.width - parentPaddingLeft - parentPaddingRight;
        const maxHeight =
          parentRect.height - parentPaddingTop - parentPaddingBottom;

        /*
         * Soft-clamp strategy: we respect the parent’s max size until the
         * user’s cursor actually travels beyond that limit.  As soon as the
         * drag distance would produce a dimension larger than the container
         * can accommodate we stop clamping and let the element follow the
         * cursor, effectively allowing it to “spill” out of its parent.
         */
        const exceedsWidth = newWidth > maxWidth;
        const exceedsHeight = newHeight > maxHeight;

        newWidth = Math.max(
          20,
          exceedsWidth ? newWidth : Math.min(newWidth, maxWidth)
        );

        newHeight = Math.max(
          20,
          exceedsHeight ? newHeight : Math.min(newHeight, maxHeight)
        );
      } else {
        // Fallback to minimum dimensions if no parent
        newWidth = Math.max(20, newWidth);
        newHeight = Math.max(20, newHeight);
      }

      // Ensure hover box stays hidden during resize
      if (hoverBox) {
        setHoverBox(null);
      }

      // Send resize message to parent
      if (focusedElementId) {
        window.parent.postMessage(
          {
            type: CHANNEL,
            msg: "RESIZE_ELEMENT",
            elementId: focusedElementId,
            width: Math.round(newWidth),
            height: Math.round(newHeight),
          },
          "*"
        );
      }
    };

    const handleMouseUp = () => {
      if (focusedElementRef.current && focusedElementId) {
        const element = focusedElementRef.current;
        const computedStyle = window.getComputedStyle(element);
        const width = parseFloat(computedStyle.width) || element.offsetWidth;
        const height = parseFloat(computedStyle.height) || element.offsetHeight;

        // Check if element has max-width/max-height constraints
        const maxWidth = computedStyle.maxWidth;
        const maxHeight = computedStyle.maxHeight;
        const hasMaxWidth =
          maxWidth && maxWidth !== "none" && maxWidth !== "initial";
        const hasMaxHeight =
          maxHeight && maxHeight !== "none" && maxHeight !== "initial";

        // Try to use relative units when possible
        const parent = element.parentElement;
        let widthValue = `${Math.round(width)}px`;
        let heightValue = `${Math.round(height)}px`;

        if (parent) {
          const parentRect = parent.getBoundingClientRect();
          const parentStyles = window.getComputedStyle(parent);
          const parentPaddingLeft = parseFloat(parentStyles.paddingLeft) || 0;
          const parentPaddingRight = parseFloat(parentStyles.paddingRight) || 0;
          const parentPaddingTop = parseFloat(parentStyles.paddingTop) || 0;
          const parentPaddingBottom =
            parseFloat(parentStyles.paddingBottom) || 0;

          const parentInnerWidth =
            parentRect.width - parentPaddingLeft - parentPaddingRight;
          const parentInnerHeight =
            parentRect.height - parentPaddingTop - parentPaddingBottom;

          // If the element takes up a significant portion of parent, use percentage
          const widthPercent = (width / parentInnerWidth) * 100;
          const heightPercent = (height / parentInnerHeight) * 100;

          // Use percentage if it's a round number or close to common values
          if (
            Math.abs(widthPercent - Math.round(widthPercent)) < 0.1 ||
            [25, 33.333, 50, 66.667, 75, 100].some(
              (v) => Math.abs(widthPercent - v) < 0.5
            )
          ) {
            widthValue = `${Math.round(widthPercent * 10) / 10}%`;
          }

          // For height, be more conservative with percentages (often px is preferred)
          if (
            Math.abs(heightPercent - Math.round(heightPercent)) < 0.1 &&
            [25, 50, 75, 100].includes(Math.round(heightPercent))
          ) {
            heightValue = `${Math.round(heightPercent)}%`;
          }
        }

        // Build styles object
        const styles: Record<string, string> = {};

        // Always set a fixed width and height to break out of responsive classes.
        styles.width = widthValue;
        styles.height = heightValue;

        // If the element had a max-width constraint (e.g. from `max-w-full`),
        // we update it to the new width to ensure the resize is not capped.
        if (hasMaxWidth) {
          styles.maxWidth = widthValue;
        }

        // Same for height.
        if (hasMaxHeight) {
          styles.maxHeight = heightValue;
        }

        // Send final dimensions as style change
        const msg: ChildToParent = {
          type: CHANNEL,
          msg: "STYLE_BLUR",
          id: focusedElementId,
          styles,
          filePath: "",
          line: 0,
          column: 0,
          className: element.getAttribute("class") || "",
        };

        // Extract file info from data-orchids-id
        const orchidsId = element.getAttribute("data-orchids-id");
        if (orchidsId) {
          const parsed = parseOrchidsId(orchidsId);
          if (parsed) {
            msg.filePath = parsed.filePath;
            msg.line = parsed.line;
            msg.column = parsed.column;
          }
        }

        window.parent.postMessage(msg, "*");
      }

      setIsResizing(false);
      isResizingRef.current = false;
      setResizeHandle(null);
      setResizeStart(null);

      // Re-enable pointer events
      document.body.style.pointerEvents = "";

      // Clear the last hit element to force re-detection after resize
      lastHitElementRef.current = null;
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, resizeStart, resizeHandle, focusedElementId, hoverBox]); // Added focusedElementId and hoverBox as dependencies

  // Cleanup function to restore element state
  const cleanupEditingElement = useCallback(() => {
    if (editingElementRef.current) {
      const element = editingElementRef.current;

      // Immediately clear the ref to prevent any further operations
      editingElementRef.current = null;

      // Flush pending style edits first for the same reason described above
      handleStyleBlur(element);

      // Now process text changes
      handleTextChange(element);

      // Restore child elements if they were protected
      if (element.childElementCount > 0) {
        restoreChildElements(element);
      }

      // Only set contentEditable to false if we made it true
      if (!wasEditableRef.current) {
        element.contentEditable = "false";
      }

      // Don't restore original styles - keep the applied styles
      // Remove the outline suppression styles only
      const currentStyle = element.getAttribute("style") || "";
      const cleanedStyle = currentStyle
        .replace(/outline:\s*none\s*!important;?/gi, "")
        .replace(/box-shadow:\s*none\s*!important;?/gi, "")
        .trim()
        .replace(/;\s*;/g, ";")
        .replace(/^;|;$/g, "");

      if (cleanedStyle) {
        element.setAttribute("style", cleanedStyle);
      } else {
        element.removeAttribute("style");
      }

      element.blur();

      // Remove event handlers
      const handlers = (element as any)._editHandlers;
      if (handlers) {
        element.removeEventListener("focus", handlers.focus);
        element.removeEventListener("blur", handlers.blur);
        element.removeEventListener("input", handlers.input);
        delete (element as any)._editHandlers;
      }

      wasEditableRef.current = false;
      // Clear the original content reference
      originalContentRef.current = "";
    }
  }, [handleStyleBlur, handleTextChange, restoreChildElements]);

  // Prevent all navigation in visual edit mode
  useEffect(() => {
    if (!isVisualEditMode) return;

    // Prevent link clicks
    const preventLinkClick = (e: Event) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");
      if (link && !link.isContentEditable) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    // Prevent form submissions
    const preventFormSubmit = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };

    // Add listeners in capture phase to catch events early
    document.addEventListener("click", preventLinkClick, true);
    document.addEventListener("submit", preventFormSubmit, true);

    return () => {
      document.removeEventListener("click", preventLinkClick, true);
      document.removeEventListener("submit", preventFormSubmit, true);
    };
  }, [isVisualEditMode]);

  // Clean up when exiting visual edit mode
  useEffect(() => {
    if (!isVisualEditMode) {
      cleanupEditingElement();
      // Clear applied styles tracking
      appliedStylesRef.current.clear();
      hasStyleChangesRef.current = false;

      // Clear image element reference
      focusedImageElementRef.current = null;
    }
  }, [isVisualEditMode]);

  // Update focus box position when scrolling or resizing
  useEffect(() => {
    if (focusedElementRef.current) {
      const handleUpdate = () => {
        updateFocusBox();

        if (focusedElementRef.current && focusedElementId) {
          const fr = focusedElementRef.current.getBoundingClientRect();
          const fBox = expandBox(fr);
          if (fBox) {
            const focMsg: ChildToParent = {
              type: CHANNEL,
              msg: "FOCUS_MOVED",
              id: focusedElementId,
              rect: {
                top: fBox.top,
                left: fBox.left,
                width: fBox.width,
                height: fBox.height,
              },
            };
            postMessageDedup(focMsg);
          }
        }
      };

      window.addEventListener("scroll", handleUpdate, true);
      window.addEventListener("resize", handleUpdate);

      // Also observe the focused element for size changes
      const resizeObserver = new ResizeObserver(handleUpdate);
      resizeObserver.observe(focusedElementRef.current);

      return () => {
        window.removeEventListener("scroll", handleUpdate, true);
        window.removeEventListener("resize", handleUpdate);
        resizeObserver.disconnect();
      };
    }
  }, [focusedElementId, updateFocusBox]);

  useEffect(() => {
    // Handle pointer movement directly in the iframe
    function onPointerMove(e: PointerEvent) {
      if (isResizingRef.current) {
        return;
      }
      // Only track pointer when visual edit mode is active
      if (!isVisualEditModeRef.current) return;

      // Don't show hover boxes while scrolling
      if (isScrolling) return;

      // Hit-testing at pointer position
      const hit =
        document
          .elementFromPoint(e.clientX, e.clientY)
          ?.closest<HTMLElement>("[data-orchids-id]") ?? null;

      if (hit !== lastHitElementRef.current) {
        lastHitElementRef.current = hit;

        if (!hit) {
          setHoverBox(null);
          setHoverBoxes([]);
          setHoverTag(null);
          lastHitIdRef.current = null;
          // If we were previously focused on an image, ensure its src is flushed
          flushImageSrcChange();

          const msg: ChildToParent = {
            type: CHANNEL,
            msg: "HIT",
            id: null,
            tag: null,
            rect: null,
          };
          postMessageDedup(msg);
          return;
        }

        // Don't show hover box if this is the focused element
        const hitId = hit.getAttribute("data-orchids-id");

        // Check if we're already showing boxes for this ID
        if (hitId === lastHitIdRef.current) {
          return;
        }

        lastHitIdRef.current = hitId;

        const tagName =
          hit.getAttribute("data-orchids-name") || hit.tagName.toLowerCase();

        // Update hover boxes immediately for instant feedback
        // Find ALL elements with the same orchids ID
        const allMatchingElements = document.querySelectorAll(
          `[data-orchids-id="${hitId}"]`
        ) as NodeListOf<HTMLElement>;

        // Create hover boxes for all matching elements except the focused one
        const boxes: Box[] = [];
        allMatchingElements.forEach((element) => {
          // Skip if this element is the focused one
          const elementId = element.getAttribute("data-orchids-id");
          if (elementId === focusedElementId) {
            return;
          }

          const rect = element.getBoundingClientRect();
          boxes.push(expandBox(rect));
        });

        // Set multiple hover boxes
        setHoverBoxes(boxes);

        // Set single hover box for the primary element (for compatibility)
        // Only set if it's not the focused element
        if (hitId !== focusedElementId) {
          const r = hit.getBoundingClientRect();
          const expandedBox = expandBox(r);
          setHoverBox(expandedBox);
        } else {
          setHoverBox(null);
        }

        setHoverTag(tagName);

        const msg: ChildToParent = {
          type: CHANNEL,
          msg: "HIT",
          id: hitId,
          tag: tagName,
          rect:
            hitId !== focusedElementId
              ? expandBox(hit.getBoundingClientRect())
              : null,
        };
        postMessageDedup(msg);
      }
    }

    // Handle pointer leaving the document
    function onPointerLeave() {
      if (!isVisualEditModeRef.current) return;

      if (isResizingRef.current) return;

      setHoverBox(null);
      setHoverBoxes([]);
      setHoverTag(null);

      // Flush image src change when cursor leaves iframe altogether
      flushImageSrcChange();

      lastHitElementRef.current = null;
      lastHitIdRef.current = null;
      const msg: ChildToParent = {
        type: CHANNEL,
        msg: "HIT",
        id: null,
        tag: null,
        rect: null,
      };
      postMessageDedup(msg);
    }

    // Handle mousedown to prepare element for editing
    function onMouseDownCapture(e: MouseEvent) {
      if (isResizingRef.current) return;
      // Only handle if visual edit mode is active
      if (!isVisualEditModeRef.current) return;

      const hit = (e.target as HTMLElement)?.closest<HTMLElement>(
        "[data-orchids-id]"
      );

      if (hit && isTextEditable(hit)) {
        // Store whether it was already editable
        wasEditableRef.current = hit.contentEditable === "true";

        // Make element editable BEFORE the click goes through
        if (!wasEditableRef.current) {
          // Apply inline styles to remove focus ring
          const currentStyle = hit.getAttribute("style") || "";
          hit.setAttribute(
            "style",
            `${currentStyle}; outline: none !important; box-shadow: none !important;`
          );

          hit.contentEditable = "true";

          // If the element has children, protect them from being edited
          if (hit.childElementCount > 0) {
            protectChildElements(hit);
          }
        }
      }
    }

    // Handle clicks to focus elements
    function onClickCapture(e: MouseEvent) {
      if (isResizingRef.current) return;
      // Only handle if visual edit mode is active
      if (!isVisualEditModeRef.current) return;

      // Debounce rapid clicks
      const now = Date.now();
      if (now - lastClickTimeRef.current < 100) {
        return;
      }
      lastClickTimeRef.current = now;

      const hit = (e.target as HTMLElement)?.closest<HTMLElement>(
        "[data-orchids-id]"
      );

      if (!hit) {
        // Clicked outside any editable element - clear focus
        if (focusedElementRef.current) {
          // Flush any pending changes
          flushImageSrcChange();
          cleanupEditingElement();

          // Clear focus
          focusedElementRef.current = null;
          setFocusBox(null);
          setFocusTag(null);
          setFocusedElementId(null);

          // Remove from localStorage
          if (typeof window !== "undefined") {
            localStorage.removeItem(FOCUSED_ELEMENT_KEY);
          }

          // Notify parent that focus was cleared
          window.parent.postMessage(
            { type: CHANNEL, msg: "CLEAR_INLINE_STYLES", elementId: "" },
            "*"
          );
        }
        return;
      }

      // Check if this is the already focused element
      if (hit === focusedElementRef.current) {
        // Clicked on already focused element - do nothing
        return;
      }

      // Clicked on a different element - change focus
      // First, cleanup the previous element
      if (focusedElementRef.current) {
        flushImageSrcChange();
        cleanupEditingElement();
      }

      // Then focus the new element
      const hitId = hit.getAttribute("data-orchids-id");
      if (!hitId) return;

      // Store reference to focused element
      focusedElementRef.current = hit;
      setFocusedElementId(hitId);

      // Store in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem(
          FOCUSED_ELEMENT_KEY,
          JSON.stringify({ id: hitId })
        );
      }

      // Get current styles for the element
      const currentStyles = getCurrentStyles(hit);

      // Get className for breakpoint detection
      const className = hit.getAttribute("class") || "";

      // Get src for img elements
      let src = "";
      if (hit.tagName.toLowerCase() === "img") {
        const imgEl = hit as HTMLImageElement;
        src = imgEl.src;
        // Store reference to the image element for src updates
        focusedImageElementRef.current = imgEl;
        // Store original src for comparison
        originalSrcRef.current = normalizeImageSrc(src);
      }

      // Update focus box
      const r = hit.getBoundingClientRect();
      const expandedBox = expandBox(r);
      setFocusBox(expandedBox);
      setFocusTag(
        hit.getAttribute("data-orchids-name") || hit.tagName.toLowerCase()
      );

      // Notify parent about the click
      const msg: ChildToParent = {
        type: CHANNEL,
        msg: "ELEMENT_CLICKED",
        id: hitId,
        tag:
          hit.getAttribute("data-orchids-name") || hit.tagName.toLowerCase(),
        rect: expandedBox as { top: number; left: number; width: number; height: number },
        clickPosition: { x: e.clientX, y: e.clientY },
        isEditable: isTextEditable(hit),
        currentStyles,
        className,
        src,
      };
      window.parent.postMessage(msg, "*");

      // If it's an editable element, make it contentEditable
      if (isTextEditable(hit)) {
        // Store whether it was already editable
        wasEditableRef.current = hit.contentEditable === "true";

        // Make element editable
        if (!wasEditableRef.current) {
          // Apply inline styles to remove focus ring
          const currentStyle = hit.getAttribute("style") || "";
          hit.setAttribute(
            "style",
            `${currentStyle}; outline: none !important; box-shadow: none !important;`
          );

          hit.contentEditable = "true";

          // If the element has children, protect them from being edited
          if (hit.childElementCount > 0) {
            protectChildElements(hit);
          }

          // Store original content for comparison
          if (hit.childElementCount > 0) {
            originalContentRef.current = extractDirectTextContent(hit);
          } else {
            originalContentRef.current = hit.innerText || hit.textContent || "";
          }

          // Add event handlers
          const handlers = {
            focus: () => {
              // Already focused, do nothing
            },
            blur: () => {
              // Handle text changes when element loses focus
              handleTextChange(hit);
              // Handle style changes when element loses focus
              handleStyleBlur(hit);
            },
            input: () => {
              // Handle text changes as user types
              handleTextChange(hit);
            },
          };

          (hit as any)._editHandlers = handlers;
          hit.addEventListener("focus", handlers.focus);
          hit.addEventListener("blur", handlers.blur);
          hit.addEventListener("input", handlers.input);

          // Store reference to editing element
          editingElementRef.current = hit;
        } else {
          // Element was already editable, just store reference
          editingElementRef.current = hit;
          // Store original content for comparison
          if (hit.childElementCount > 0) {
            originalContentRef.current = extractDirectTextContent(hit);
          } else {
            originalContentRef.current = hit.innerText || hit.textContent || "";
          }
        }
      } else {
        // Not an editable element, but still focused
        editingElementRef.current = null;
        originalContentRef.current = "";
      }
    }

    // Handle messages from parent
    function onMsg(e: MessageEvent<ParentToChild>) {
      if (e.data?.type !== CHANNEL) return;

      switch (e.data.msg) {
        case "POINTER":
          // Simulate pointer movement for testing
          break;
        case "VISUAL_EDIT_MODE":
          setIsVisualEditMode(e.data.active);
          break;
        case "SCROLL":
          // Handle scroll delta from parent
          if (focusedElementRef.current) {
            setIsScrolling(true);
            if (scrollTimeoutRef.current) {
              clearTimeout(scrollTimeoutRef.current);
            }
            scrollTimeoutRef.current = window.setTimeout(() => {
              setIsScrolling(false);
            }, 100); // Reset scrolling state after 100ms of no scroll
          }
          break;
        case "CLEAR_INLINE_STYLES":
          // Clear inline styles from a specific element
          if (e.data.elementId) {
            const element = document.querySelector(
              `[data-orchids-id="${e.data.elementId}"]`
            ) as HTMLElement;
            if (element) {
              // Remove inline styles but preserve orchids attributes
              const orchidsId = element.getAttribute("data-orchids-id");
              const orchidsName = element.getAttribute("data-orchids-name");
              element.removeAttribute("style");
              if (orchidsId) {
                element.setAttribute("data-orchids-id", orchidsId);
              }
              if (orchidsName) {
                element.setAttribute("data-orchids-name", orchidsName);
              }
            }
          }
          break;
        case "PREVIEW_FONT":
          // Preview a font family on an element
          if (e.data.elementId && e.data.fontFamily) {
            const element = document.querySelector(
              `[data-orchids-id="${e.data.elementId}"]`
            ) as HTMLElement;
            if (element) {
              // Check if this element already has a persistent font
              if (persistentFontMap.current.has(e.data.elementId)) {
                // Don't override persistent fonts
                return;
              }

              // Load font if not already loaded
              const familyKey = e.data.fontFamily.replace(/['\s]+/g, "+");
              if (!loadedFontFamilies.current.has(familyKey)) {
                const link = document.createElement("link");
                link.rel = "stylesheet";
                link.href = `https://fonts.googleapis.com/css2?family=${familyKey}:wght@400&display=swap`;
                document.head.appendChild(link);
                loadedFontFamilies.current.add(familyKey);
              }

              // Apply font with !important to override existing styles
              element.style.setProperty(
                "font-family",
                `'${e.data.fontFamily}'`,
                "important"
              );
            }
          }
          break;
        case "RESIZE_ELEMENT":
          // Resize an element
          if (e.data.elementId && focusedElementRef.current) {
            const element = document.querySelector(
              `[data-orchids-id="${e.data.elementId}"]`
            ) as HTMLElement;
            if (element && focusedElementRef.current === element) {
              // Apply temporary resize styles
              element.style.setProperty(
                "width",
                `${e.data.width}px`,
                "important"
              );
              element.style.setProperty(
                "height",
                `${e.data.height}px`,
                "important"
              );

              // Update focus box
              updateFocusBox();
            }
          }
          break;
        case "SHOW_ELEMENT_HOVER":
          // Show hover effect on a specific element
          if (e.data.elementId) {
            const element = document.querySelector(
              `[data-orchids-id="${e.data.elementId}"]`
            ) as HTMLElement;
            if (element) {
              const r = element.getBoundingClientRect();
              const expandedBox = expandBox(r);
              setHoverBox(expandedBox);
              setHoverTag(
                element.getAttribute("data-orchids-name") ||
                  element.tagName.toLowerCase()
              );
            } else {
              setHoverBox(null);
              setHoverTag(null);
            }
          } else {
            setHoverBox(null);
            setHoverTag(null);
          }
          break;
      }
    }

    // Handle scroll events
    function onScroll() {
      // Notify parent about scroll start
      window.parent.postMessage(
        { type: CHANNEL, msg: "SCROLL_STARTED" },
        "*"
      );

      // Set scrolling state
      setIsScrolling(true);

      // Clear any existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Set timeout to clear scrolling state
      scrollTimeoutRef.current = window.setTimeout(() => {
        setIsScrolling(false);
        // Notify parent about scroll stop
        window.parent.postMessage(
          { type: CHANNEL, msg: "SCROLL_STOPPED" },
          "*"
        );
      }, 100); // Reset scrolling state after 100ms of no scroll
    }

    // Add event listeners
    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("mousedown", onMouseDownCapture, true);
    document.addEventListener("click", onClickCapture, true);
    window.addEventListener("message", onMsg);
    window.addEventListener("scroll", onScroll, true);

    // Cleanup
    return () => {
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("mousedown", onMouseDownCapture, true);
      document.removeEventListener("click", onClickCapture, true);
      window.removeEventListener("message", onMsg);
      window.removeEventListener("scroll", onScroll, true);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [focusedElementId, isResizing, cleanupEditingElement, isScrolling, updateFocusBox]);

  return (
    <>
      {/* Hover box - shows on hover with blue overlay */}
      {isVisualEditMode && !isResizing && (
        <>
          {/* Render all hover boxes for elements with same ID */}
          {hoverBoxes
            .filter((box): box is NonNullable<Box> => box !== null)
            .map((box, index) => (
              <div key={index}>
                <div
                  className="fixed pointer-events-none border-[0.5px] border-[#38bdf8] bg-blue-200/20 border-dashed rounded-sm"
                  style={{
                    zIndex: 100000,
                    left: box.left,
                    top: box.top,
                    width: box.width,
                    height: box.height,
                  }}
                />
                {/* Tag label on each hover box */}
                {hoverTag && (
                  <div
                    className="fixed pointer-events-none text-[10px] text-white bg-[#38bdf8] px-1 py-0.5 rounded-sm"
                    style={{
                      zIndex: 100001,
                      left: box.left,
                      top: box.top - 20,
                    }}
                  >
                    {hoverTag}
                  </div>
                )}
              </div>
            ))}
        </>
      )}

      {/* Focus box - shows on click with just border, no overlay */}
      {isVisualEditMode && focusBox && (
        <>
          {focusTag && (
            <div
              className="fixed text-[10px] font-semibold text-white bg-[#3b82f6] px-1 rounded-sm pointer-events-none select-none"
              style={{
                zIndex: 100003,
                left: focusBox.left - 4,
                top: focusBox.top - 16,
              }}
            >
              {focusTag}
            </div>
          )}

          <div
            className="fixed pointer-events-none border-[1.5px] border-[#38bdf8] rounded-sm"
            style={{
              zIndex: 100001,
              left: focusBox.left,
              top: focusBox.top,
              width: focusBox.width,
              height: focusBox.height,
            }}
          />

          {/* Resize handles */}
          {!isResizing && (
            <>
              {/* Corner handles */}
              <div
                className="fixed w-2 h-2 bg-[#38bdf8] rounded-full cursor-nw-resize pointer-events-auto resize-handle"
                style={{
                  zIndex: 100002,
                  left: focusBox.left - 4,
                  top: focusBox.top - 4,
                }}
                onMouseDown={(e) => handleResizeStart(e, "nw")}
              />
              <div
                className="fixed w-2 h-2 bg-[#38bdf8] rounded-full cursor-ne-resize pointer-events-auto resize-handle"
                style={{
                  zIndex: 100002,
                  left: focusBox.left + focusBox.width - 4,
                  top: focusBox.top - 4,
                }}
                onMouseDown={(e) => handleResizeStart(e, "ne")}
              />
              <div
                className="fixed w-2 h-2 bg-[#38bdf8] rounded-full cursor-sw-resize pointer-events-auto resize-handle"
                style={{
                  zIndex: 100002,
                  left: focusBox.left - 4,
                  top: focusBox.top + focusBox.height - 4,
                }}
                onMouseDown={(e) => handleResizeStart(e, "sw")}
              />
              <div
                className="fixed w-2 h-2 bg-[#38bdf8] rounded-full cursor-se-resize pointer-events-auto resize-handle"
                style={{
                  zIndex: 100002,
                  left: focusBox.left + focusBox.width - 4,
                  top: focusBox.top + focusBox.height - 4,
                }}
                onMouseDown={(e) => handleResizeStart(e, "se")}
              />

              {/* Edge handles */}
              <div
                className="fixed w-2 h-2 bg-[#38bdf8] rounded-full cursor-n-resize pointer-events-auto resize-handle"
                style={{
                  zIndex: 100002,
                  left: focusBox.left + focusBox.width / 2 - 4,
                  top: focusBox.top - 4,
                }}
                onMouseDown={(e) => handleResizeStart(e, "n")}
              />
              <div
                className="fixed w-2 h-2 bg-[#38bdf8] rounded-full cursor-s-resize pointer-events-auto resize-handle"
                style={{
                  zIndex: 100002,
                  left: focusBox.left + focusBox.width / 2 - 4,
                  top: focusBox.top + focusBox.height - 4,
                }}
                onMouseDown={(e) => handleResizeStart(e, "s")}
              />
              <div
                className="fixed w-2 h-2 bg-[#38bdf8] rounded-full cursor-w-resize pointer-events-auto resize-handle"
                style={{
                  zIndex: 100002,
                  left: focusBox.left - 4,
                  top: focusBox.top + focusBox.height / 2 - 4,
                }}
                onMouseDown={(e) => handleResizeStart(e, "w")}
              />
              <div
                className="fixed w-2 h-2 bg-[#38bdf8] rounded-full cursor-e-resize pointer-events-auto resize-handle"
                style={{
                  zIndex: 100002,
                  left: focusBox.left + focusBox.width - 4,
                  top: focusBox.top + focusBox.height / 2 - 4,
                }}
                onMouseDown={(e) => handleResizeStart(e, "e")}
              />
            </>
          )}
        </>
      )}
    </>
  );
}
