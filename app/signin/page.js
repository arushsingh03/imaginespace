"use client";

import { supabase } from "@/supabase_client";

export default function SignInPage() {
  const signInUser = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };
  return (
    <div className="min-h-[100vh] bg items-center flex justify-center w-full p-12">
      <button
        className="button flex items-center space-x-2 px-4 py-2"
        onClick={signInUser}
      >
        <img
          src="/google-new.svg"
          alt="google"
          className="h-6 w-6 filter drop-shadow-[0_0_12px_rgba(255,255,255,0.8)] hover:drop-shadow-[0_0_20px_rgba(255,255,255,1)] transition duration-300 ease-in-out"
        />
        <span>Sign In With Google</span>
      </button>
    </div>
  );
}
