import { Hero } from "@/components/Hero";
import { Partners } from "@/components/Partners";
import { ResearchAreas } from "@/components/ResearchAreas";
import { MissionValues } from "@/components/MissionValues";
import dynamic from "next/dynamic";

// Lazy load components that are below the fold
const FeaturedProjects = dynamic(() => import("@/components/FeaturedProjects"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const Pricing = dynamic(() => import("@/components/Pricing"));
const FAQ = dynamic(() => import("@/components/FAQ"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function Home() {
  return (
    <div className="bg-stone-100">
      <Hero />
      <Partners />
      <ResearchAreas />
      <MissionValues />
      <FeaturedProjects />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  );
}