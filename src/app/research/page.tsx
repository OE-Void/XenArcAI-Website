"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";

const researchPapers = [
  {
    title: "Advancing Multimodal Understanding in Large Language Models",
    authors: ["Dr. Sarah Chen", "Dr. James Wilson", "Dr. Maria Rodriguez"],
    date: "November 2024",
    category: "Large Language Models",
    abstract: "This paper explores novel approaches to integrating visual and textual understanding in large-scale language models, demonstrating significant improvements in cross-modal reasoning tasks.",
    link: "/research/multimodal-llm",
    status: "Published"
  },
  {
    title: "Ethical Frameworks for AI Alignment and Safety",
    authors: ["Dr. Robert Kim", "Dr. Emily Thompson"],
    date: "October 2024",
    category: "AI Safety & Ethics",
    abstract: "We propose a comprehensive framework for ensuring AI systems remain aligned with human values while maintaining robustness against adversarial scenarios and unintended behaviors.",
    link: "/research/ethical-frameworks",
    status: "Under Review"
  },
  {
    title: "Efficient Training of Vision Transformers at Scale",
    authors: ["Dr. Michael Zhang", "Dr. Lisa Anderson", "Dr. David Park"],
    date: "September 2024",
    category: "Computer Vision",
    abstract: "We introduce novel optimization techniques that reduce computational requirements for training vision transformers by 40% while maintaining or improving performance on benchmark datasets.",
    link: "/research/vision-transformers",
    status: "Published"
  }
];

export default function ResearchPage() {
  const sortedPapers = [...researchPapers].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="bg-stone-100 min-h-screen flex flex-col">
      <main className="flex-grow pt-24 md:pt-32">
        <section className="py-16 md:py-32 max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="border-y">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="container flex flex-col gap-6 border-x py-4 max-lg:border-x lg:py-8 px-4 md:px-7"
            >
              <h1 className="text-4xl font-playfair font-medium tracking-tight md:text-5xl lg:text-7xl text-foreground">
                Research
              </h1>
              <p className="text-muted-foreground max-w-[600px] tracking-[-0.32px] text-sm md:text-base">
                Explore our latest research papers and contributions to AI advancement, focusing on large language models, AI safety, and cutting-edge machine learning techniques.
              </p>
            </motion.div>
          </div>

          {/* Research Papers Grid */}
          <div className="container border-x-2">
            <div className="divide-y-2">
              {sortedPapers.map((paper, index) => (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="group py-8 px-6 md:py-12 md:px-8 hover:bg-stone-50/50 transition-all duration-200"
                >
                  <Link href={paper.link} className="flex flex-col gap-4">
                    {/* Meta */}
                    <div className="flex items-center gap-3 text-xs text-muted-foreground uppercase tracking-wide font-medium">
                      <span>{paper.date}</span>
                      <span>·</span>
                      <span>{paper.category}</span>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl md:text-3xl font-playfair font-medium tracking-tight group-hover:text-primary transition-colors">
                      {paper.title}
                    </h2>

                    {/* Abstract */}
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-3xl">
                      {paper.abstract}
                    </p>

                    {/* Authors & Action */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex gap-2">
                        <span className="text-xs font-medium text-muted-foreground bg-stone-200/50 px-2 py-1 rounded-md">
                          {paper.authors.join(", ")}
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-foreground group-hover:translate-x-1 transition-transform">
                        Read paper
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>

          {/* Bottom Spacer */}
          <div className="h-8 w-full border-y md:h-12 lg:h-[112px]">
            <div className="container h-full w-full border-x"></div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}