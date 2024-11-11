"use client";

import Image from "next/image";
import HeroImg from "@/public/Hero.png";
import { redirect } from "next/navigation";

export function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center py-12 lg:py-20">
      {/* Text and Button */}
      <div className="text-center relative z-10">
        <span className="inline-block text-xl font-semibold bg-transparent text-white px-6 py-3 rounded-lg shadow-md shadow-purple-900 hover:bg-white/10 transition duration-300">
          Discover the Power of Imagine Space
        </span>
        <h1 className="mt-8 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium leading-none">
          Unlock Your Imagination{" "}
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-violet-500">
            Dream it. Create it.
          </span>
        </h1>
        <p className="max-w-[840px] mx-auto mt-8 lg:text-lg text-white">
          Imagine Space brings your ideas to life with powerful AI-driven image
          generation. <br /> Create stunning, unique visuals effortlessly and
          explore endless creative possibilities with just a few clicks.
        </p>

        <div className="mt-10">
          <button
            onClick={() => redirect("/signin")}
            className="px-6 py-3 bg-gradient-to-r from-violet-700 to-fuchsia-700 text-white font-semibold text-lg rounded-lg shadow-lg hover:bg-opacity-40 transition-all duration-300 ease-in-out relative z-20"
          >
            Get Started with Imagine Space
          </button>
        </div>
      </div>

      {/* Background SVG */}
      <div className="relative items-center w-full py-12 mx-auto mt-12">
        {/* Ensure that SVG covers the entire width and height */}
        <svg
          className="absolute inset-0 w-full h-full -mt-24 blur-3xl"
          style={{ zIndex: 0 }} // Ensure SVG stays behind other elements
          fill="none"
          viewBox="0 0 400 400"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_10_20)">
            <g filter="url(#filter0_f_10_20)">
              <path
                d="M128.6 0H0V322.2L106.2 134.75L128.6 0Z"
                fill="#a855f7"
              ></path>
              <path
                d="M0 322.2V400H240H320L106.2 134.75L0 322.2Z"
                fill="#9333ea"
              ></path>
              <path
                d="M320 400H400V78.75L106.2 134.75L320 400Z"
                fill="#7e22ce"
              ></path>
              <path
                d="M400 0H128.6L106.2 134.75L400 78.75V0Z"
                fill="#6b21a8"
              ></path>
            </g>
          </g>
          <defs>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="720.666"
              id="filter0_f_10_20"
              width="720.666"
              x="-160.333"
              y="-160.333"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
              <feBlend
                in="SourceGraphic"
                in2="BackgroundImageFix"
                mode="normal"
                result="shape"
              ></feBlend>
              <feGaussianBlur
                result="effect1_foregroundBlur_10_20"
                stdDeviation="80.1666"
              ></feGaussianBlur>
            </filter>
          </defs>
        </svg>

        {/* Hero Image */}
        <Image
          src={HeroImg}
          alt="Hero"
          className="relative object-cover mx-auto w-[1150px] border rounded-lg shadow-2xl lg:rounded-2xl"
        />
      </div>
    </section>
  );
}
