import GalaxyBackground from "./(comps)/galaxy";
import Header from "./(comps)/header";
import { Hero } from "./(comps)/hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-violet-950 via-fuchsia-950 to-blue-950 text-gray-200 flex flex-col items-center">
    <GalaxyBackground />
    <Header />
    <Hero />
    </main>
  );
}