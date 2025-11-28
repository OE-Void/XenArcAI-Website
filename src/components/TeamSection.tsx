"use client";

import { BookOpen, Code, Calendar } from "lucide-react";
import { motion } from "framer-motion";

const TeamSection = () => {
  return (
    <section className="py-16 lg:py-24">
      <div className="container max-w-7xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4">
            Our Organization
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            A forward-thinking organization focused on advancing AI research and development.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-6 md:gap-8"
        >
          <div className="flex items-center gap-3">
            <BookOpen className="size-5 text-muted-foreground" />
            <span className="text-base md:text-lg font-medium">1 Publication</span>
          </div>
          <div className="flex items-center gap-3">
            <Code className="size-5 text-muted-foreground" />
            <span className="text-base md:text-lg font-medium">2 Open Source Projects</span>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="size-5 text-muted-foreground" />
            <span className="text-base md:text-lg font-medium">Founded in 2025</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;