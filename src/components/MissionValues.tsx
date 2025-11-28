"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import Image from "next/image";

interface list {
  title: string;
  value: string;
  summary: string;
  image: {
    src: string;
    alt: string;
  };
}

const LIST: Array<list> = [
  {
    title: "Developing AGI for humanity while being accessible.",
    value: "1",
    summary:
      "XenArcAI combines cutting-edge research with practical applications to create AI solutions that make a real impact on humanity's future.",
    image: {
      src: "https://cdn.cosmos.so/a13978fa-5536-4e89-a976-5d24b239a389?format=jpeg",
      alt: "AGI development illustration",
    },
  },
  {
    title: "Ethics-first approach to AI innovation and research.",
    value: "2",
    summary:
      "We maintain the highest standards of ethics and responsibility in AI development, ensuring our solutions remain beneficial and aligned with human values.",
    image: {
      src: "https://cdn.cosmos.so/31a4b92a-1b71-47ee-87e2-7594ad90e52a?format=jpeg",
      alt: "Ethical AI research dashboard",
    },
  },
  {
    title: "Open source contributions and collaborative research.",
    value: "3",
    summary:
      "Building partnerships with academic institutions and industry leaders to advance AI research through open collaboration and knowledge sharing.",
    image: {
      src: "https://cdn.cosmos.so/65975927-a67d-4024-9f78-cc6a3f6c737f?format=jpeg",
      alt: "Collaborative research network",
    },
  },
];
export const MissionValues = () => {
  return (
    <section className="py-16 md:py-32">
      <div className="container max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-8 flex flex-col items-start justify-between gap-6 md:mb-20"
        >
          <h2 className="text-left text-3xl md:text-5xl max-w-4xl text-foreground lg:text-6xl">
            Advancing AI{" "}
            <span className="text-muted-foreground">
              research through innovation and collaboration
            </span>
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs defaultValue={LIST[0].value} className="gap-8 xl:flex-row xl:gap-14">
            <TabsList className="h-fit w-fit flex-col gap-2.5 bg-transparent p-0">
              {LIST.map((item, i) => (
                <TabsTrigger
                  className="flex-col items-start rounded-none p-4 md:p-5 text-left shadow-none border whitespace-normal data-[state=active]:bg-muted data-[state=active]:outline cursor-pointer xl:max-w-[34.0625rem]"
                  key={`tab-trigger-${i}`}
                  value={item.value}
                >
                  <div className="leading-normal font-bold text-sm md:text-base">{item.title}</div>
                  <div className="leading-normal text-muted-foreground text-xs md:text-sm">
                    {item.summary}
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
            {LIST.map((item, i) => (
              <TabsContent
                className="w-full"
                key={`tab-content-${i}`}
                value={item.value}
              >
                <AspectRatio
                  ratio={16 / 9}
                  className="overflow-hidden rounded-[0.75rem]"
                >
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    className="block size-full object-cover object-center"
                    width={800}
                    height={450}
                    unoptimized
                  />
                </AspectRatio>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
};
