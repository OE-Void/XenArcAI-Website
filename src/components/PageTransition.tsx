"use client";

import { motion } from "motion/react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  // Scroll to top on pathname change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ 
        duration: 0.3, 
        ease: "easeInOut",
        opacity: { duration: 0.2 },
        y: { duration: 0.3 }
      }}
    >
      {children}
    </motion.div>
  );
}