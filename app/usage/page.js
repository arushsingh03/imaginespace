"use client";

import useUser from "@/hooks/useUser";
import Header from "../(comps)/Header";
import { motion } from "framer-motion";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/supabase_client";
import GalaxyBackground from "../(comps)/galaxy";
import { FileCog, ImagePlus } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function UsagePage() {
  const [user] = useUser();
  if (user == "no user") redirect("/signin");
  const [imagesUsage, setImagesUsage] = useState({
    created: 0,
    edited: 0,
  });
  const fetchImages = async () => {
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);
    const thirtyDaysAgoISOString = thirtyDaysAgo.toISOString();
    const [createdImgs, editedImgs] = await Promise.all([
      supabase
        .from("images_created")
        .select()
        .eq("user_id", user?.id)
        .gte("created_at", thirtyDaysAgoISOString),
      supabase
        .from("images_edited")
        .select()
        .eq("user_id", user?.id)
        .gte("created_at", thirtyDaysAgoISOString),
    ]);
    setImagesUsage({
      created: createdImgs.data.length,
      edited: editedImgs.data.length,
    });
  };
  useEffect(() => {
    if (!supabase || user == "no user" || !user) return;
    fetchImages();
  }, [supabase, user]);

  return (
    <div className="bg-gray-950 min-h-screen w-full flex flex-col items-center justify-start">
      <Header />
      <motion.div
        className="w-full max-w-2xl my-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full mt-12 h-96 bg-gradient-to-r from-violet-950 to-fuchsia-950 border-[4px] border-white/20">
          <GalaxyBackground />
          <CardHeader className="bg-transparent">
            <CardTitle className="text-white font-semibold text-xl">
              Usage in the last 30 days
            </CardTitle>
            <hr className="border-t-2 border-white/20 my-4" />
          </CardHeader>
          <CardContent className="text-white mt-12">
            <div className="space-y-20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <ImagePlus size={28} className="text-white" />
                  <p className="font-medium">Images generated</p>
                </div>
                <div className="flex items-center space-x-4 font-medium">
                  <Progress
                    value={(imagesUsage.created / 30) * 100}
                    className="w-48 border-[2px]"
                  />
                  <p>{imagesUsage.created}/30</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <FileCog size={28} className="text-white" />
                  <p className="font-medium">Images Edited</p>
                </div>
                <div className="flex items-center space-x-4 font-medium">
                  <Progress
                    value={(imagesUsage.edited / 30) * 100}
                    className="w-48 border-[2px]"
                  />
                  <p>{imagesUsage.edited}/30</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
