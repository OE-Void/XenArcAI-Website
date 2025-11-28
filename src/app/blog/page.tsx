"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";

const blogPosts = [
  {
    slug: "welcome",
    title: "Welcome to XenArcAI",
    date: "October 17, 2024",
    description: "Our first blog post where we share our vision for the future of AGI and what you can expect from our research team.",
    tags: ["Announcement"],
    readTime: "3 min read"
  },
  {
    slug: "ai-ethics",
    title: "The Importance of AI Ethics",
    date: "October 10, 2024",
    description: "Exploring how ethical considerations must shape the development of artificial intelligence systems from the ground up.",
    tags: ["Ethics", "Research"],
    readTime: "5 min read"
  },
  {
    slug: "neural-networks",
    title: "Understanding Neural Networks",
    date: "October 3, 2024",
    description: "A deep dive into the core concepts behind neural networks and their applications in modern AI systems.",
    tags: ["Tutorial", "Deep Learning"],
    readTime: "8 min read"
  }
];

export default function BlogPage() {
  const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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
                Blogs
              </h1>
              <p className="text-muted-foreground max-w-[600px] tracking-[-0.32px] text-sm md:text-base">
                Insights, updates, and thoughts from the XenArcAI team on the future of artificial intelligence.
              </p>
            </motion.div>
          </div>

          {/* Blog Posts Grid */}
          <div className="container border-x-2">
            <div className="divide-y-2">
              {sortedPosts.map((post, index) => (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="group py-8 px-6 md:py-12 md:px-8 hover:bg-stone-50/50 transition-all duration-200"
                >
                  <Link href={`/blog/${post.slug}`} className="flex flex-col gap-4">
                    {/* Meta */}
                    <div className="flex items-center gap-3 text-xs text-muted-foreground uppercase tracking-wide font-medium">
                      <span>{post.date}</span>
                      <span>·</span>
                      <span>{post.readTime}</span>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl md:text-3xl font-playfair font-medium tracking-tight group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>

                    {/* Description */}
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-3xl">
                      {post.description}
                    </p>

                    {/* Tags & Action */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex gap-2">
                        {post.tags.map((tag) => (
                          <span key={tag} className="text-xs font-medium text-muted-foreground bg-stone-200/50 px-2 py-1 rounded-md">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-foreground group-hover:translate-x-1 transition-transform">
                        Read article
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