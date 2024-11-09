"use client";

import { redirect } from "next/navigation"; // Import redirect from next/navigation
import { supabase } from "@/supabase_client";
import AIBackground from "../(comps)/aibackground";

const Astronaut = () => (
  <svg
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
    className="w-32 h-32"
  >
    <g className="animate-float">
      <path
        d="M100 140c-22 0-40-18-40-40v-30c0-22 18-40 40-40s40 18 40 40v30c0 22-18 40-40 40z"
        fill="white"
      />
      <circle cx="100" cy="70" r="30" fill="#D1D5DB" />
      <path
        d="M85 65a5 5 0 0110 0 5 5 0 01-10 0M105 65a5 5 0 0110 0 5 5 0 01-10 0"
        fill="#4B5563"
      />
      <rect x="85" y="90" width="30" height="40" rx="5" fill="#374151" />
      <path
        d="M60 90c-5 15-5 30 0 45M140 90c5 15 5 30 0 45"
        stroke="white"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d="M85 140l-10 20M115 140l10 20"
        stroke="white"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d="M80 60c10-5 30-5 40 0"
        fill="none"
        stroke="#9CA3AF"
        strokeWidth="2"
      />
    </g>
  </svg>
);

const SignInPage = () => {
  // Function to handle the sign-in with OAuth
  const signInUser = async (provider) => {
    await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: `${window.location.origin}/dashboard`, // Add redirect URL after successful login
      },
    });

    // Use redirect here for immediate navigation after the sign-in process
    redirect("/dashboard"); // Redirect user to the dashboard or any other page
  };

  return (
    <div className="min-h-[100vh] bg-gradient-to-b from-violet-950 via-fuchsia-950 to-blue-950 items-center flex justify-center w-full p-12 relative overflow-hidden">
      <AIBackground />

      {/* Floating stars decoration */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-md w-full">
        {/* Astronaut at the top */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-20">
          <Astronaut />
        </div>

        {/* Main card */}
        <div className="bg-black/30 backdrop-blur-md rounded-2xl p-8 border border-white shadow-2xl mt-20">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome to Imagine Space
            </h1>
            <p className="text-gray-300">
              Transform your imagination into stunning images - your creative
              journey starts here.
            </p>
          </div>

          <div className="space-y-4">
            <button
              className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-lg flex items-center justify-center space-x-3 px-4 py-3 transition-all duration-300 border border-white/10 hover:border-white/30 group"
              onClick={() => signInUser("google")}
            >
              <img
                src="/google-new.svg"
                alt="Google"
                className="h-6 w-6 filter drop-shadow-[0_0_12px_rgba(255,255,255,0.8)] group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,1)] transition duration-300"
              />
              <span>Sign In With Google</span>
            </button>

            <button
              className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-lg flex items-center justify-center space-x-3 px-4 py-3 transition-all duration-300 border border-white/10 hover:border-white/30 group"
              onClick={() => signInUser("github")}
            >
              <img
                src="/github.svg"
                alt="GitHub"
                className="h-7 w-7 filter drop-shadow-[0_0_12px_rgba(240,240,240,0.5)] group-hover:drop-shadow-[0_0_20px_rgba(240,240,240,0.5)] transition duration-300"
              />
              <span>Sign In With GitHub</span>
            </button>
          </div>

          <div className="mt-8 text-center text-sm text-gray-400">
            <p>By signing in, you agree to our</p>
            <div className="space-x-2 mt-1">
              <a
                href="#"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Terms of Service
              </a>
              <span>&middot;</span>
              <a
                href="#"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>

        {/* Decorative glows */}
        <div className="absolute -z-10">
          <div className="absolute top-10 -left-20 w-12 h-12 bg-blue-500 rounded-full blur-xl opacity-20"></div>
          <div className="absolute -bottom-10 -right-20 w-12 h-12 bg-purple-500 rounded-full blur-xl opacity-20"></div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
