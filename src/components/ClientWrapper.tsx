"use client";

import { AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";
import PageTransition from "@/components/PageTransition";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <PageTransition key={pathname}>
        {children}
      </PageTransition>
    </AnimatePresence>
  );
}