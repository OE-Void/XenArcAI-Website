"use client";

import { ChevronRight } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import { Button } from "@/components/ui/button";

export const HomeHero = () => {
  return (
    <section className="pt-4 md:pt-8 pb-0">
      <div className="relative container max-w-7xl mx-auto min-h-[80dvh] md:min-h-[100dvh] px-4" id="hero-section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative md:absolute md:bottom-45 z-10 lg:max-w-2xl w-full md:w-2xl pt-20 md:pt-0"
        >
          <h2 className="relative md:absolute md:-top-110 z-0 text-left font-extralight text-4xl md:text-5xl tracking-tight lg:text-7xl">
            Developing AGI for humanity
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative z-20 mt-8 max-w-2xl font-medium text-muted-foreground leading-6 text-sm md:text-base"
          >
            <span className="text-primary pr-2">
              Advanced AI research that's accessible and ethically correct.
            </span>{" "}
            <br />
            Combining cutting-edge research with practical applications <br className="hidden md:block" /> to create AI solutions that make a real impact.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative md:absolute flex flex-col items-start md:items-end mt-12 md:mt-0 md:bottom-20 z-10 max-w-xl lg:right-0 lg:bottom-45"
        >
          <h2 className="relative z-20 text-foreground text-left md:text-right font-playfair text-4xl md:text-5xl tracking-tighter lg:text-7xl">
            while being accessible
          </h2>
          <div className="flex gap-2 mt-6 md:mt-10 flex-wrap">
            <Button className="group h-12 md:h-14 w-36 md:w-40 flex cursor-pointer active:scale-[0.98] items-center justify-center gap-2 font-thin rounded-full border px-4 py-1 tracking-tight text-sm md:text-base">
              Contact Us
              <ChevronRight className="size-4 mt-1 transition-all ease-out group-hover:rotate-0" />
            </Button>
            <Button className="group h-12 md:h-14 w-36 md:w-40 flex cursor-pointer active:scale-[0.98] items-center justify-center gap-2 bg-white text-primary border-border outline-2 hover:bg-gray-200 rounded-full border px-4 py-1 tracking-tight text-sm md:text-base">
              Explore Research
              <ChevronRight className="size-4 mt-1 transition-all ease-out group-hover:rotate-0" />
            </Button>
          </div>
        </motion.div>


      </div>
    </section>
  );
};
