"use client";

import { motion } from "framer-motion";
import { ExternalLink, Database, Brain } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    title: "SparkEmbedding-300m",
    description: "A state-of-the-art multilingual text embedding model by XenArcAI, fine-tuned from EmbeddingGemma. Optimized for cross-lingual retrieval, semantic search, and Matryoshka Representation Learning (MRL). Supports 119 languages with a 2048-token context window, designed for high-efficiency scalable deployment.",
    icon: Brain,
    tags: ["Embeddings", "Semantic Search"],
    link: "https://huggingface.co/XenArcAI/SparkEmbedding-300m",
    stats: {
      parameters: "0.3B",
      context: "2048 tokens",
      languages: "119"
    }
  },
  {
    title: "MathX Dataset",
    description: "A high-quality, synthetically curated, and meticulously filtered dataset designed for advanced mathematical reasoning and AI model training.",
    icon: Database,
    tags: ["Dataset", "Mathematical Reasoning", "Training Data"],
    link: "https://huggingface.co/datasets/XenArcAI/MathX-5M",
    stats: {
      size: "5M",
      items: "1"
    }
  },
  {
    title: "CodeX",
    description: "A massive collection of pre-curated coding datasets by XenArcAI, featuring over 9 million samples. Includes 'CodeX-2M-Thinking' with step-by-step reasoning for instruction tuning and 'CodeX-7M-Non-Thinking' for raw pattern learning.",
    icon: Database,
    tags: ["Synthetic Data", "Reasoning", "Code"],
    link: "https://huggingface.co/collections/XenArcAI/codex-673b31305436329e46636746",
    stats: {
      samples: "9.5M+",
      datasets: "2",
      size: "10GB+"
    }
  },
];

const HomeProjects = () => {
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
            Our Projects
          </h2>
          <p className="text-muted-foreground max-w-[600px] tracking-[-0.32px] text-sm md:text-base">
            Explore our open-source contributions to the AI research community through models, datasets, and tools published.
          </p>
        </motion.div>
      </div>

      <div className="lg:px-0! container border-x">
        <div className="items-center">
          <div className="grid flex-1 max-lg:divide-y lg:grid-cols-3 lg:divide-x">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative isolate pt-5 text-start lg:pt-20"
              >
                <div className="px-4 lg:px-8">
                  <div className="inline-flex items-center justify-center rounded-lg bg-muted p-3 mb-4">
                    <project.icon className="h-6 w-6 text-foreground" />
                  </div>
                  <h3 className="mt-2 text-lg tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground pb-4 pt-2 text-sm md:text-base">
                    {project.description}
                  </p>

                  <div className="sr-only flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="sr-only text-xs text-muted-foreground">
                      {Object.entries(project.stats).map(([key, value]) => (
                        <div key={key}>{key}: {value}</div>
                      ))}
                    </div>
                    <Link
                      href={project.link}
                      target="_blank"
                      className="ml-auto inline-flex items-center gap-1 text-sm font-medium text-foreground hover:opacity-70 transition-opacity"
                    >
                      View on Hugging Face
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </div>
                </div>

                <div className="border-t mt-6 pt-6 px-4 lg:px-8">
                  <div className="h-32 bg-gradient-to-r from-muted to-muted/50 rounded-lg flex items-center justify-center">
                    <span className="text-muted-foreground text-sm"></span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="h-8 w-full border-y md:h-12 lg:h-[112px]">
        <div className="container h-full w-full border-x flex items-center justify-center">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeProjects;