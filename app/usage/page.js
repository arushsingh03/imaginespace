"use client";

import useUser from "@/hooks/useUser";
import Header from "../(comps)/Header";
import { motion } from "framer-motion";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/supabase_client";
import { ImagePlus, FileCog } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import GalaxyBackground from "../(comps)/galaxy";

const UsagePage = () => {
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

  const data = [
    { name: "Images Generated", value: imagesUsage.created },
    { name: "Images Edited", value: imagesUsage.edited },
  ];

  const COLORS = ["#a855f7", "#c084fc"];

  return (
    <div className="bg-gradient-to-b from-violet-950 via-fuchsia-950 to-blue-950 min-h-screen w-full flex flex-col items-center justify-start">
      <GalaxyBackground />
      <Header />
      <motion.div
        className="w-full max-w-2xl my-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full bg-gradient-to-r from-gray-900 to-violet-950 rounded-2xl">
          <CardHeader className="bg-transparent px-8 pt-8">
            <CardTitle className="text-white font-semibold text-2xl mb-2">
              Your Usage in the Last 30 Days
            </CardTitle>
            <p className="text-white/80 m-2">
              Track your image generation and editing activity on Imagine Space.
            </p>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <div className="grid grid-cols-2 gap-8">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-violet-500 rounded-full">
                  <ImagePlus size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">Images Generated</p>
                  <p className="text-white/80 text-lg font-medium">
                    {imagesUsage.created}/30
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-fuchsia-500 rounded-full">
                  <FileCog size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">Images Edited</p>
                  <p className="text-white/80 text-lg font-medium">
                    {imagesUsage.edited}/30
                  </p>
                </div>
              </div>
              <div className="col-span-2">
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie
                      data={data}
                      innerRadius={60}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      labelLine={false}
                    >
                      {data.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default UsagePage;