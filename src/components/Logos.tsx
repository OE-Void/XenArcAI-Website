"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const Logos = () => {
  const topRowCompanies = [
    {
      name: "Mercury",
      logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/mainline/logos/mercury.svg",
      width: 143,
      height: 26,
      href: "https://mercury.com",
    },
    {
      name: "Watershed",
      logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/mainline/logos/watershed.svg",
      width: 154,
      height: 31,
      href: "https://watershed.com",
    },
    {
      name: "Retool",
      logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/mainline/logos/retool.svg",
      width: 113,
      height: 22,
      href: "https://retool.com",
    },
    {
      name: "Descript",
      logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/mainline/logos/descript.svg",
      width: 112,
      height: 27,
      href: "https://descript.com",
    },
  ];

  const bottomRowCompanies = [
    {
      name: "Perplexity",
      logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/mainline/logos/perplexity.svg",
      width: 141,
      height: 32,
      href: "https://perplexity.com",
    },
    {
      name: "Monzo",
      logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/mainline/logos/monzo.svg",
      width: 104,
      height: 18,
      href: "https://monzo.com",
    },
    {
      name: "Ramp",
      logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/mainline/logos/ramp.svg",
      width: 105,
      height: 28,
      href: "https://ramp.com",
    },
    {
      name: "Raycast",
      logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/mainline/logos/raycast.svg",
      width: 128,
      height: 33,
      href: "https://raycast.com",
    },
    {
      name: "Arc",
      logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/mainline/logos/arc.svg",
      width: 90,
      height: 28,
      href: "https://arc.com",
    },
  ];

  return (
    <section className="py-16 md:py-32 mx-auto pt-0">
      <div className="container mx-auto space-y-10 lg:space-y-16 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="mb-4 text-xl text-balance md:text-2xl lg:text-4xl px-4">
            Developing AGI for humanity while being
            <br className="max-md:hidden" />
            <span className="text-muted-foreground">
              accessible and ethically correct
            </span>
          </h2>
        </motion.div>

        <div className="flex w-full flex-col items-center gap-8">
          {/* Top row - 4 logos */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 items-center justify-items-center gap-x-8 gap-y-8 max-md:w-full sm:grid-cols-4 md:gap-x-20 lg:gap-x-28"
          >
            {topRowCompanies.map((company, index) => (
              <a href={company.href} target="_blank" key={index}>
                <Image
                  src={company.logo}
                  alt={`${company.name} logo`}
                  width={company.width}
                  height={company.height}
                  className="object-contain transition-opacity hover:opacity-70 max-w-[100px] md:max-w-none"
                  unoptimized
                />
              </a>
            ))}
          </motion.div>

          {/* Bottom row - 5 logos */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 items-center justify-items-center gap-x-8 gap-y-8 max-md:w-full sm:grid-cols-3 md:grid-cols-5 md:gap-x-20 lg:gap-x-28"
          >
            {bottomRowCompanies.map((company, index) => (
              <a href={company.href} target="_blank" key={index}>
                <Image
                  src={company.logo}
                  alt={`${company.name} logo`}
                  width={company.width}
                  height={company.height}
                  className="object-contain transition-opacity hover:opacity-70 max-w-[100px] md:max-w-none"
                  unoptimized
                />
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export { Logos };