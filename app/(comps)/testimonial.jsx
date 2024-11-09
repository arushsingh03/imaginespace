export function Testimonial() {
    return (
      <div className="relative max-w-[85rem] px-4 py-8 sm:px-6 lg:px-8 lg:py-10 mx-auto">
        <blockquote className="text-center lg:mx-auto lg:w-4/5">
          <div className="mb-4">
            <a
              href="https://github.com/arushsingh03"
              target="_blank"
              className="hover:opacity-50 transition-opacity duration-300 inline-block"
            >
              <svg
                width="60"
                height="60"
                viewBox="0 0 24 24"
                className="text-primary"
                fill="currentColor"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
          <p className="text-lg leading-normal max-w-[90%] mx-auto">
            Imagine Space has completely changed the way I approach creative projects! The ability to generate high-quality images in seconds with just a simple prompt is mind-blowing. The interface is sleek, and the AI-driven results are exactly what I envisioned. Highly recommend to anyone looking to unleash their creativity effortlessly.
          </p>
  
          <footer className="mt-6">
            <p className="font-semibold">Arush ⚙️</p>
            <p className="text-sm text-muted-foreground">
              FullStack Developer | AI Enthusiast
            </p>
          </footer>
        </blockquote>
      </div>
    );
  }
  