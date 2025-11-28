"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const DATA = [
  {
    title: "Cutting-Edge Research",
    description:
      "Advancing AI through innovative research in LLMs, computer vision, and AI safety with rigorous scientific methodology.",
    icon: "CircleHelp",
    image:
      "https://cdn.cosmos.so/410de9a7-1213-433a-93da-043b0e2e2a7b?format=jpeg",
  },
  {
    title: "Real-World Applications",
    description:
      "Translating research into practical AI solutions that solve complex problems and create meaningful impact",
    icon: "Volume2",
    image:
      "https://cdn.cosmos.so/c32afa87-08ab-4e83-b768-7c1c7877e889?format=jpeg",
  },
  {
    title: "Open Source Contributions",
    description:
      "Building transparent AI systems and sharing knowledge to advance the entire AI research community forward",
    icon: "Lightbulb",
    image:
      "https://cdn.cosmos.so/410de9a7-1213-433a-93da-043b0e2e2a7b?format=jpeg",
  },
];
export const HomeFeatures = () => {
  return (
    <section className="py-16 md:py-32 max-w-7xl mx-auto">
      <div className="border-y">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container flex flex-col gap-6 border-x py-4 max-lg:border-x lg:py-8 px-4 md:px-7"
        >
          <h2 className="text-3xl leading-tight tracking-tight font-extralight md:text-4xl lg:text-6xl">
            Research Areas at XenArcAI
          </h2>
          <p className="text-muted-foreground max-w-[600px] tracking-[-0.32px] text-sm md:text-base">
            Our multidisciplinary research spans the full spectrum of AI, from
            foundational theory to practical applications that solve real problems.
          </p>
        </motion.div>
      </div>

      <div className="lg:px-0! container border-x">
        <div className="items-center">
          <div className="grid flex-1 max-lg:divide-y lg:grid-cols-3 lg:divide-x">
            {DATA.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative isolate pt-5 text-start lg:pt-20"
              >
                <h3 className="mt-2 px-4 text-lg tracking-tight lg:px-8">
                  {item.title}
                </h3>
                <p className="text-muted-foreground pb-6 pt-2 px-4 lg:px-8 text-sm md:text-base">
                  {item.description}
                </p>
                <div className="border-t">
                  <Image
                    src={item.image}
                    alt={item.title}
                    className="bg-muted dark:invert w-full"
                    width={400}
                    height={300}
                    priority={index === 0}
                    unoptimized
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="h-8 w-full border-y md:h-12 lg:h-[112px]">
        <div className="container h-full w-full border-x"></div>
      </div>
    </section>
  );
};
