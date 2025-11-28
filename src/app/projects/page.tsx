"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Database, Brain, Code, Layers } from "lucide-react";
import Link from "next/link";

import HomeFooter from "@/components/HomeFooter";

const projects = [
    {
        title: "SparkEmbedding-300m",
        description: "A state-of-the-art multilingual text embedding model by XenArcAI, fine-tuned from EmbeddingGemma. Optimized for cross-lingual retrieval, semantic search, and Matryoshka Representation Learning (MRL). Supports 119 languages with a 2048-token context window, designed for high-efficiency scalable deployment.",
        icon: Brain,
        tags: ["Text Embeddings", "Multilingual"],
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
        tags: ["Mathematical Reasoning", "Training Data"],
        link: "https://huggingface.co/datasets/XenArcAI/MathX-5M",
        stats: {
            size: "5M",
            items: "1"
        }
    },
    {
        title: "CodeX",
        description: "A massive collection of pre-curated coding datasets by XenArcAI, featuring over 9 million samples. Includes 'CodeX-2M-Thinking' with step-by-step reasoning for instruction tuning and 'CodeX-7M-Non-Thinking' for raw pattern learning.",
        icon: Code,
        tags: ["Synthetic Data", "Reasoning", "Code"],
        link: "https://huggingface.co/collections/XenArcAI/codex-673b31305436329e46636746",
        stats: {
            samples: "9.5M+",
            datasets: "2",
            size: "10GB+"
        }
    },
    {
        title: "AIRealNet",
        description: "A binary image classifier designed to distinguish AI-generated images from real human photographs. Built on Microsoft's Swinv2 Tiny architecture for high accuracy and efficient deployment. Prioritizes privacy by excluding personal data from training.",
        icon: Layers,
        tags: ["AI Detection", "Computer Vision"],
        link: "https://huggingface.co/XenArcAI/AIRealNet",
        stats: {
            downloads: "86/month",
            parameters: "0.2B"
        }
    }
];

export default function ProjectsPage() {
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
                            <h1 className="text-4xl font-extralight tracking-tight md:text-5xl lg:text-7xl">
                                Our Projects
                            </h1>
                            <p className="text-muted-foreground max-w-[600px] tracking-[-0.32px] text-sm md:text-base">
                                Explore our comprehensive portfolio of open-source contributions, including state-of-the-art models, massive datasets, and specialized tools for the AI research community.
                            </p>
                        </motion.div>
                    </div>

                    {/* Projects Grid */}
                    <div className="lg:px-0! container border-x">
                        <div className="items-center">
                            <div className="grid flex-1 max-lg:divide-y lg:grid-cols-3 lg:divide-x">
                                {projects.map((project, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
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
