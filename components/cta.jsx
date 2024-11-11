"use client";

import { redirect } from "next/navigation";

export function CTA() {
  return (
    <section className="my-20 relative isolate overflow-hidden px-6 py-20 text-center sm:rounded-3xl sm:border sm:shadow-lg">
      <h2 className="font-bold text-3xl sm:text-4xl">
        Bring Your Ideas to Life with Imagine Space! 🌌 
      </h2>
      <p className="text-muted-foreground leading-8 mt-6 text-lg max-w-xl mx-auto">
        Unlock your creativity with AI-driven image generation. Start exploring
        endless possibilities today.
      </p>
      <div className="mt-6">
        <button
          onClick={() => redirect("/signin")}
          className="px-6 py-3 bg-gradient-to-r  from-blue-700 to-violet-700 text-white font-semibold text-lg rounded-lg shadow-lg hover:bg-opacity-40 transition-all duration-300 ease-in-out"
        >
          Get Started with Imagine Space
        </button>
      </div>

      <svg
        viewBox="0 0 1024 1024"
        className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
        aria-hidden="true"
      >
        <circle
          cx={512}
          cy={512}
          r={512}
          fill="url(#blue-gradient)"
          fillOpacity="0.6"
        />
        <defs>
          <radialGradient id="blue-gradient">
            <stop stopColor="#38bdf8" />
            <stop offset={1} stopColor="#0284c7" />
          </radialGradient>
        </defs>
      </svg>
    </section>
  );
}
