"use client";

import { motion } from "framer-motion";
import { ExternalLink, Database, Brain, Code, Layers } from "lucide-react";
import Link from "next/link";

import Footer from "@/components/Footer";

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
                            <h1 className="text-4xl font-playfair font-medium tracking-tight md:text-5xl lg:text-7xl">
                                Our Projects
                            </h1>
                            <p className="text-muted-foreground max-w-[600px] tracking-[-0.32px] text-sm md:text-base">
                                Explore our comprehensive portfolio of open-source contributions, including state-of-the-art models, massive datasets, and specialized tools for the AI research community.
                            </p>
                        </motion.div>
                    </div>

                    {/* Projects List */}
                    <div className="container border-x-2">
                        <div className="divide-y-2">
                            {projects.map((project, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="group py-10 px-6 md:py-14 md:px-10 hover:bg-stone-50/50 transition-all duration-200"
                                >
                                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
                                        {/* Icon & Title Column */}
                                        <div className="flex-shrink-0 lg:w-1/4">
                                            <div className="inline-flex items-center justify-center rounded-xl bg-white border shadow-sm p-4 mb-4 group-hover:scale-110 transition-transform duration-300">
                                                <project.icon className="h-8 w-8 text-foreground" />
                                            </div>
                                            <h2 className="text-2xl font-playfair font-medium tracking-tight group-hover:text-primary transition-colors">
                                                {project.title}
                                            </h2>
                                            <div className="flex flex-wrap gap-2 mt-3">
                                                {project.tags.map((tag, tagIndex) => (
                                                    <span
                                                        key={tagIndex}
                                                        className="inline-flex items-center rounded-md bg-stone-200/50 px-2 py-1 text-xs font-medium text-muted-foreground"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Description & Stats Column */}
                                        <div className="flex-grow space-y-6">
                                            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                                                {project.description}
                                            </p>

                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-4 border-y border-dashed">
                                                {Object.entries(project.stats).map(([key, value]) => (
                                                    <div key={key} className="flex flex-col">
                                                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                                            {key}
                                                        </span>
                                                        <span className="text-sm font-semibold text-foreground mt-0.5">
                                                            {value}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="pt-2">
                                                <Link
                                                    href={project.link}
                                                    target="_blank"
                                                    className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors group/link"
                                                >
                                                    View on Hugging Face
                                                    <ExternalLink className="h-4 w-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
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
