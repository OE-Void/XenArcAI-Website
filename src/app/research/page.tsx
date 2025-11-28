"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

import HomeFooter from "@/components/HomeFooter";

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
                  className="py-8 px-6 md:py-12 md:px-8 hover:bg-stone-50/50 transition-all duration-200"
                >
                  <div className="flex flex-col gap-4">
                    {/* Badges */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        {paper.category}
                      </span>
                      <span className="text-muted-foreground">·</span>
                      <span className={`text-xs font-medium uppercase tracking-wide ${paper.status === "Published"
                        ? "text-green-600"
                        : "text-yellow-600"
                        }`}>
                        {paper.status}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl md:text-2xl font-semibold tracking-tight leading-tight">
                      {paper.title}
                    </h2>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span>{paper.authors.join(", ")}</span>
                      <span>·</span>
                      <span>{paper.date}</span>
                    </div>

                    {/* Abstract */}
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      {paper.abstract}
                    </p>

                    {/* Action */}
                    <div className="pt-2">
                      <Link
                        href={paper.link}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
                      >
                        Read paper
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
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

      <HomeFooter />
    </div>
  );
}