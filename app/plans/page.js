"use client";

import axios from "axios";
import useUser from "@/hooks/useUser";
import Header from "../(comps)/header";
import { redirect } from "next/navigation";
import { FaCheckCircle, FaEdit, FaLayerGroup, FaImage, FaCloudUploadAlt, FaLightbulb } from "react-icons/fa";
import GalaxyBackground from "../(comps)/galaxy";

export default function Plans() {
  const [user] = useUser();
  const handlePlan = async () => {
    user == "no user" ? redirect("/signin") : pay(user);
  };
  const pay = async () => {
    try {
      const payload = { email: user.email };
      const response = await axios.post("/api/checkout_sessions", payload);
      const data = response.data;
      window.location.replace(data.url);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-950 via-fuchsia-950 to-blue-950 flex flex-col items-center justify-start text-gray-200">
      <GalaxyBackground />
      <Header />
      <div className="w-full flex items-center justify-center min-h-screen">
        {/* Plans Container */}
        <div className="border border-gray-100 rounded-xl flex flex-col py-10 px-8 bg-purple-950 text-white w-full sm:w-4/5 md:w-3/5 lg:w-1/2 xl:w-1/2 shadow-lg m-12">
          <h1 className="text-gray-100 pb-4 text-center text-3xl font-semibold border-b border-gray-200">
          <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent font-bold ml-2">
              Premium Plan
            </span>
          </h1>

          {/* Briefing Paragraph */}
          <p className="text-white text-center mt-4 mb-8">
            Take your creative projects to the next level with our AI-driven Premium Plan! From generating high-quality images and captions to advanced editing features, this plan is designed to empower creators with cutting-edge tools and streamline your workflow.
          </p>

          <ul className="w-full text-left mt-4 space-y-6">
            <li className="flex items-center space-x-3">
              <FaCheckCircle className="text-white" />
              <span className="text-gray-300">Generate stunning images instantly with AI</span>
            </li>
            <li className="flex items-center space-x-3">
              <FaEdit className="text-white" />
              <span className="text-gray-300">Access powerful AI tools for seamless image editing</span>
            </li>
            <li className="flex items-center space-x-3">
              <FaLayerGroup className="text-white" />
              <span className="text-gray-300">Unlock 3 advanced language models for flexible AI interactions</span>
            </li>
            <li className="flex items-center space-x-3">
              <FaImage className="text-white" />
              <span className="text-gray-300">Generate image captions with contextual accuracy</span>
            </li>
            <li className="flex items-center space-x-3">
              <FaCloudUploadAlt className="text-white" />
              <span className="text-gray-300">Enhance old photos to pristine quality effortlessly</span>
            </li>
            <li className="flex items-center space-x-3">
              <FaLightbulb className="text-white" />
              <span className="text-gray-300">Easily remove backgrounds from images</span>
            </li>
          </ul>

          <div className="flex justify-between items-center w-full pt-8 border-t border-gray-200 mt-8">
            <h2 className="text-xl font-semibold text-gray-100">₹ 599.00/month</h2>
            <button onClick={handlePlan} className="bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-fuchsia-600 hover:to-violet-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200">
              Start Your AI-Powered Journey
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 