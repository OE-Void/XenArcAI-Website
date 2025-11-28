"use client";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

function HomePricing() {
  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl space-y-6 text-center"
        >
          <h2 className="text-center text-3xl md:text-4xl lg:text-6xl">Research Impact</h2>
          <p className="text-sm md:text-base px-4">
            XenArcAI is advancing AI research through innovation, ethics, and collaboration for a better future.
          </p>
        </motion.div>

        <div className="mt-8 grid gap-6 md:mt-20 md:grid-cols-5 md:gap-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="border-black/20 border-dotted flex flex-col justify-between space-y-8 border p-6 md:col-span-2 md:my-2 md:rounded-r-none md:border-r-0 lg:p-10"
          >
            <div className="space-y-4">
              <div>
                <h2 className="font-medium text-sm md:text-base">Founded</h2>
                <span className="my-3 block text-xl md:text-2xl font-semibold">
                  2025
                </span>
                <p className="text-muted-foreground text-xs md:text-sm">Young company</p>
              </div>

              <Button asChild variant="outline" className="w-full text-sm md:text-base">
                <Link href="/contact">Get In Touch</Link>
              </Button>

              <hr className="border-dashed" />

              <ul className="list-outside space-y-3 text-xs md:text-sm">
                {[
                  "AI Safety & Alignment Research",
                  "Large Language Models",
                  "Open Source Contributions",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="size-3 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="dark:bg-muted border-dotted border border-black/30 p-6 md:col-span-3 lg:p-10 dark:[--color-muted:var(--color-zinc-900)]"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <h2 className="font-medium text-sm md:text-base">Research</h2>
                  <span className="my-3 block text-xl md:text-2xl font-semibold">
                    Active
                  </span>
                  <p className="text-muted-foreground text-xs md:text-sm">Current focus</p>
                </div>

                <Button asChild className="w-full text-sm md:text-base">
                  <Link href="/research">Explore Research</Link>
                </Button>
              </div>

              <div>
                <div className="text-xs md:text-sm font-medium">
                  Our research areas:
                </div>

                <ul className="mt-4 list-outside space-y-3 text-xs md:text-sm">
                  {[
                    "Computer Vision Systems",
                    "Knowledge Graph Reasoning",
                    "Conversational AI Models",
                    "Autonomous Agent Planning",
                    "Multimodal AI Applications",
                    "Ethical AI Development",
                    "Real-World Problem Solving",
                    "Open Source Innovation",
                    "Academic Collaborations",
                    "Industry Partnerships",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="size-3 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
export default HomePricing;