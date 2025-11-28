"use client";

import { motion } from "framer-motion";

export default function FAQs() {
  return (
    <section className="scroll-py-16 py-16 md:scroll-py-32 md:py-32" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="grid gap-y-12 px-2 lg:[grid-template-columns:1fr_auto]">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <h2 id="faq-heading" className="mb-4 text-3xl md:text-4xl lg:text-6xl">
              Frequently <br className="hidden lg:block" /> Asked{" "}
              <br className="hidden lg:block" />
              Questions
            </h2>
            <p className="text-sm md:text-base">Common questions about our AI research and collaboration.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="divide-y divide-dashed sm:mx-auto sm:max-w-lg lg:mx-0"
          >
            <div className="pb-6">
              <h3 className="font-medium text-base md:text-lg">
                What is XenArcAI's research focus?
              </h3>
              <p className="text-muted-foreground mt-4 text-sm md:text-base">
                We focus on developing AGI for humanity through ethical AI research across multiple domains including LLMs, computer vision, and AI safety.
              </p>

              <ol className="list-outside list-decimal space-y-2 pl-4">
                <li className="text-muted-foreground mt-4 text-xs md:text-sm">
                  Large Language Models with improved reasoning and human alignment.
                </li>
                <li className="text-muted-foreground mt-4 text-xs md:text-sm">
                  Computer Vision systems for multimodal AI applications.
                </li>
                <li className="text-muted-foreground mt-4 text-xs md:text-sm">
                  AI Safety & Alignment research to ensure beneficial AI systems.
                </li>
              </ol>
            </div>
            <div className="py-6">
              <h3 className="font-medium text-base md:text-lg">
                How can I collaborate with XenArcAI?
              </h3>
              <p className="text-muted-foreground mt-4 text-sm md:text-base">
                We welcome research partnerships, open-source contributions, and collaboration inquiries through our contact form or email.
              </p>
            </div>
            <div className="py-6">
              <h3 className="font-medium text-base md:text-lg">What are your core values?</h3>
              <p className="text-muted-foreground my-4 text-sm md:text-base">
                Our approach is built on three fundamental principles that guide all our research and development efforts.
              </p>
              <ul className="list-outside list-disc space-y-2 pl-4">
                <li className="text-muted-foreground text-xs md:text-sm">
                  Ethics First: Responsible AI development with human values at the core.
                </li>
                <li className="text-muted-foreground text-xs md:text-sm">
                  Innovation: Pushing boundaries with cutting-edge research and technology.
                </li>
              </ul>
            </div>
            <div className="py-6">
              <h3 className="font-medium text-base md:text-lg">
                Do you have open-source projects?
              </h3>
              <p className="text-muted-foreground mt-4 text-sm md:text-base">
                Yes, we actively contribute to open-source initiatives and have 2 open-source projects. We believe in collaborative innovation for the AI community.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}