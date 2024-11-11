import { CTA } from "@/components/cta";
import { Features } from "@/components/features";
import GalaxyBackground from "@/components/galaxy";
import { Hero } from "@/components/hero";
import { Testimonial } from "@/components/testimonial";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-violet-950 via-fuchsia-950 to-blue-950 text-gray-200 flex flex-col items-center">
      <GalaxyBackground />
      <Hero />
      <Features />
      <Testimonial />
      <CTA />
    </main>
  );
}
