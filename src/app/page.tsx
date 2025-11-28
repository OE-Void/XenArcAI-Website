import { HomeHero } from "@/components/HomeHero";
import { HomeLogos } from "@/components/HomeLogos";
import { HomeFeatures } from "@/components/HomeFeatures";
import { HomeFeaturesSecondary } from "@/components/HomeFeaturesSecondary";
import dynamic from "next/dynamic";

// Lazy load components that are below the fold
const HomeProjects = dynamic(() => import("@/components/HomeProjects"));
const HomeTestimonials = dynamic(() => import("@/components/HomeTestimonials"));
const HomePricing = dynamic(() => import("@/components/HomePricing"));
const HomeFAQ = dynamic(() => import("@/components/HomeFAQ"));
const HomeFooter = dynamic(() => import("@/components/HomeFooter"));

export default function Home() {
  return (
    <div className="bg-stone-100">
      <HomeHero />
      <HomeLogos />
      <HomeFeatures />
      <HomeFeaturesSecondary />
      <HomeProjects />
      <HomeTestimonials />
      <HomePricing />
      <HomeFAQ />
      <HomeFooter />
    </div>
  );
}