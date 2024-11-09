import { Hero } from "./(comps)/hero";
import { CTA } from "./(comps)/cta";
import { Features } from "./(comps)/features";
import { Testimonial } from "./(comps)/testimonial";
import GalaxyBackground from "./(comps)/galaxy";

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