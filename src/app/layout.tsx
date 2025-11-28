import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import ClientWrapper from "@/components/ClientWrapper";
import { ProductionErrorBoundary } from "@/components/ProductionErrorBoundary";

// Performance monitoring
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://xenarcai.com"),
  title: "XenArcAI - Advanced AI Research",
  description: "Developing AGI for humanity through innovative AI research, ethics, and collaboration.",
  keywords: ["AI", "AGI", "Artificial Intelligence", "Machine Learning", "Research", "Ethics", "Innovation"],
  authors: [{ name: "XenArcAI Team" }],
  creator: "XenArcAI",
  publisher: "XenArcAI",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://xenarcai.com", // Update with your actual domain
  },
  icons: {
    icon: [
      { url: '/atom-icon.svg' },
      { url: '/favicon.ico' },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://xenarcai.com", // Update with your actual domain
    siteName: "XenArcAI",
    title: "XenArcAI - Advanced AI Research",
    description: "Developing AGI for humanity through innovative AI research, ethics, and collaboration.",
    images: [
      {
        url: "/og-image.jpg", // Add your OG image
        width: 1200,
        height: 630,
        alt: "XenArcAI - Advanced AI Research",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "XenArcAI - Advanced AI Research",
    description: "Developing AGI for humanity through innovative AI research, ethics, and collaboration.",
    images: ["/og-image.jpg"], // Add your OG image
    creator: "@XenArcAI", // Update with your Twitter handle
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <ErrorReporter />
        {/* Performance monitoring */}
        <Suspense fallback={null}>
          <ClientWrapper>
            <ProductionErrorBoundary>
              {children}
            </ProductionErrorBoundary>
          </ClientWrapper>
        </Suspense>
        <Navbar hideOnBlog={true} />
        <VisualEditsMessenger />
      </body>
    </html>
  );
}