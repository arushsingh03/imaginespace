"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabase_client";
import { FilePlus2 } from "lucide-react";
import GalaxyBackground from "../(comps)/galaxy";
import Header from "../(comps)/Header";

export default function DashboardPage() {
  const [canvasItems, setCanvasItems] = useState([]);
  const [user] = useUser();
  const router = useRouter();
  const id = uuidv4();

  const createNewCanvas = async () => {
    await supabase
      .from("canvas")
      .insert([{ canvas_id: id, user_id: user.id }])
      .select();
    router.replace(`/canvas/${id}`);
  };

  const fetchCanvas = async () => {
    const { data } = await supabase
      .from("canvas")
      .select()
      .eq("user_id", user?.id)
      .order("created_at", { ascending: false });
    setCanvasItems(data);
  };

  useEffect(() => {
    if (!user || !supabase) return;
    fetchCanvas();
  }, [supabase, user]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-950 via-fuchsia-950 to-blue-950 text-gray-200 flex flex-col items-center">
      <GalaxyBackground />
      <Header />
      <div className="max-w-7xl w-full flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8">
        
        {/* New Canvas Button */}
        <div className="w-full flex justify-end py-6">
          <button
            onClick={createNewCanvas}
            className="bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-fuchsia-600 hover:to-violet-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
          >
            <FilePlus2 className="size-5" />
            <span>New Canvas</span>
          </button>
        </div>

        {/* Canvas Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-8 w-full">
          {canvasItems.map((item, i) => (
            <Link
              key={item.id}
              href={`/canvas/${item.id}`}
              className="group relative overflow-hidden rounded-xl bg-purple-950 text-white shadow-lg border border-gray-100 hover:border-gray-200 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative p-6">
                <div className="text-gray-100 text-lg font-medium">
                  Canvas {i + 1}
                </div>
                <div className="mt-2 text-gray-300">
                  Click to open this canvas
                </div>
              </div>
            </Link>
          ))}

          {/* No Canvases Message */}
          {canvasItems.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-300">
              <div className="text-xl font-medium mb-4">No canvases yet</div>
              <div>Create your first canvas to get started</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
