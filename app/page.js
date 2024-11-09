import { Hero } from "./(comps)/hero";
import { CTA } from "./(comps)/cta";
import { Features } from "./(comps)/features";
import AIBackground from "./(comps)/aibackground";
import { Testimonial } from "./(comps)/testimonial";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-violet-950 via-fuchsia-950 to-blue-950 text-gray-200 flex flex-col items-center">
    <AIBackground />
    <Hero />
    <Features />
    <Testimonial />
    <CTA />
    </main>
  );
}