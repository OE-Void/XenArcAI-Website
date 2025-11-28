"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is XenArcAI's research focus?",
    answer: "We focus on developing AGI for humanity through ethical AI research across multiple domains including LLMs, computer vision, and AI safety. Our key areas include Large Language Models with improved reasoning, Computer Vision systems for multimodal AI, and AI Safety & Alignment research."
  },
  {
    question: "How can I collaborate with XenArcAI?",
    answer: "We welcome research partnerships, open-source contributions, and collaboration inquiries. You can reach out through our contact form or email to discuss potential partnerships in academic research, industry applications, or open-source development."
  },
  {
    question: "What are your core values?",
    answer: "Our approach is built on three fundamental principles: Ethics First (responsible AI development with human values at the core), Innovation (pushing boundaries with cutting-edge research), and Collaboration (believing in the power of open science)."
  },
  {
    question: "Do you have open-source projects?",
    answer: "Yes, we actively contribute to open-source initiatives and have multiple open-source projects including SparkEmbedding-300m and CodeX. We believe in collaborative innovation and transparency for the AI community."
  },
  {
    question: "How do you ensure AI safety?",
    answer: "AI safety is at the core of our research. We employ rigorous testing, alignment techniques, and ethical guidelines to ensure our AI systems remain beneficial and controllable. We actively research and publish on AI alignment methodologies."
  }
];

const FAQ = () => {
  return (
    <section className="py-16 md:py-32 max-w-7xl mx-auto" aria-labelledby="faq-heading">
      <div className="border-y">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container flex flex-col gap-6 border-x py-4 max-lg:border-x lg:py-8 px-4 md:px-7"
        >
          <h2 id="faq-heading" className="text-3xl leading-tight tracking-tight font-extralight md:text-4xl lg:text-6xl">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground max-w-[600px] tracking-[-0.32px] text-sm md:text-base">
            Common questions about our AI research, collaboration opportunities, and ethical guidelines.
          </p>
        </motion.div>
      </div>

      <div className="lg:px-0! container border-x">
        <div className="grid lg:grid-cols-2">
          <div className="hidden lg:block border-r p-8 lg:p-12 bg-stone-50/50">
            <div className="sticky top-32">
              <h3 className="text-2xl font-light tracking-tight mb-4">Have more questions?</h3>
              <p className="text-muted-foreground mb-6">
                Can't find what you're looking for? Our team is here to help with any inquiries about our research or tools.
              </p>
              <a href="/contact" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                Contact Support
              </a>
            </div>
          </div>

          <div className="p-4 lg:p-12">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b-0 mb-4 last:mb-0">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <AccordionTrigger className="text-left text-base md:text-lg font-normal hover:no-underline py-4 px-4 hover:bg-muted/50 rounded-lg transition-colors [&[data-state=open]]:bg-muted/50">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-4 text-muted-foreground leading-relaxed pt-2 pb-6">
                      {faq.answer}
                    </AccordionContent>
                  </motion.div>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>

      <div className="h-8 w-full border-y md:h-12 lg:h-[112px]">
        <div className="container h-full w-full border-x"></div>
      </div>
    </section>
  );
};

export default FAQ;