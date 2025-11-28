"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

type Testimonial = {
  name: string;
  role: string;
  image: string;
  quote: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Dr. Sarah Chen",
    role: "AI Research Director",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    quote:
      "XenArcAI's approach to ethical AI development is groundbreaking. Their research quality is exceptional and impactful.",
  },
  {
    name: "Marcus Johnson",
    role: "ML Engineer",
    image: "https://randomuser.me/api/portraits/men/6.jpg",
    quote:
      "The open-source contributions from XenArcAI have accelerated our AI projects significantly. Truly innovative work.",
  },
  {
    name: "Elena Rodriguez",
    role: "AI Ethics Researcher",
    image: "https://randomuser.me/api/portraits/women/7.jpg",
    quote:
      "XenArcAI sets the gold standard for responsible AI development. Their ethics-first approach is inspiring.",
  },
  {
    name: "David Park",
    role: "Tech Lead",
    image: "https://randomuser.me/api/portraits/men/8.jpg",
    quote:
      "Collaborating with XenArcAI transformed our understanding of AGI development. Exceptional team and vision.",
  },
  {
    name: "Dr. Priya Sharma",
    role: "Computer Vision Scientist",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    quote:
      "XenArcAI's multimodal research is cutting-edge. They're pushing boundaries in AI safety and alignment.",
  },
  {
    name: "Alex Thompson",
    role: "Research Engineer",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    quote:
      "The quality of research from XenArcAI is outstanding. Their collaborative approach drives real innovation.",
  },
  {
    name: "Dr. Lisa Wang",
    role: "NLP Researcher",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    quote:
      "XenArcAI's language models show remarkable progress in reasoning and alignment. Truly impressive work.",
  },
  {
    name: "Robert Kim",
    role: "AI Product Manager",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    quote:
      "XenArcAI delivers practical AI solutions with strong ethical foundations. Perfect partner for innovation.",
  },
  {
    name: "Dr. Anna Foster",
    role: "AI Safety Specialist",
    image: "https://randomuser.me/api/portraits/women/10.jpg",
    quote:
      "Their commitment to AI safety and human values is unmatched. XenArcAI is leading responsible AI development.",
  },
  {
    name: "James Wilson",
    role: "Autonomous Systems Lead",
    image: "https://randomuser.me/api/portraits/men/11.jpg",
    quote:
      "XenArcAI's autonomous agents research is revolutionary. They're solving complex real-world challenges.",
  },
  {
    name: "Dr. Maya Patel",
    role: "Knowledge Systems Expert",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    quote:
      "The knowledge reasoning capabilities developed by XenArcAI are exceptional. Groundbreaking research quality.",
  },
  {
    name: "Tom Anderson",
    role: "Conversational AI Engineer",
    image: "https://randomuser.me/api/portraits/men/13.jpg",
    quote:
      "XenArcAI's dialogue systems are incredibly natural and context-aware. They're redefining conversational AI.",
  },
];

const chunkArray = (
  array: Testimonial[],
  chunkSize: number
): Testimonial[][] => {
  const result: Testimonial[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};

const testimonialChunks = chunkArray(
  testimonials,
  Math.ceil(testimonials.length / 3)
);

export default function TestimonialSection() {
  return (
    <section>
      <div className="py-16 md:py-32">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-title text-4xl md:text-6xl text-foreground">
              Trusted by AI Researchers
            </h2>
            <p className="text-body mt-6 text-sm md:text-base px-4">
              XenArcAI advances AI research through ethical development, 
              cutting-edge innovation, and meaningful collaboration.
            </p>
          </motion.div>
          <div className="mt-8 grid gap-3 [--color-card:var(--color-muted)] sm:grid-cols-2 md:mt-12 lg:grid-cols-3 dark:[--color-muted:var(--color-zinc-900)]">
            {testimonialChunks.map((chunk, chunkIndex) => (
              <motion.div
                key={chunkIndex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: chunkIndex * 0.1 }}
                className="space-y-3 *:border-none *:shadow-none"
              >
                {chunk.map(({ name, role, quote, image }, index) => (
                  <Card
                    className="rounded-none outline outline-dotted divide-dotted bg-stone-100"
                    key={index}
                  >
                    <CardContent className="grid grid-cols-[auto_1fr] gap-3 pt-6">
                      <Avatar className="size-9">
                        <AvatarImage
                          alt={name}
                          src={image}
                        />
                        <AvatarFallback>ST</AvatarFallback>
                      </Avatar>

                      <div>
                        <h3 className="font-medium text-sm md:text-base">{name}</h3>

                        <span className="text-muted-foreground block text-xs md:text-sm tracking-wide">
                          {role}
                        </span>

                        <blockquote className="mt-3">
                          <p className="text-gray-700 dark:text-gray-300 text-xs md:text-sm">
                            {quote}
                          </p>
                        </blockquote>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}