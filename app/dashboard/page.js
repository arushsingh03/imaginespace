"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useUser from "@/hooks/useUser";
import Header from "../(comps)/header";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabase_client";
import { FilePlus2 } from "lucide-react";

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
    const { data, error } = await supabase
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
    <div className="min-h-screen w-full bg">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full flex justify-end py-6">
          <button
            onClick={createNewCanvas}
            className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg shadow-lg backdrop-blur-sm transition-all duration-300 flex items-center space-x-2"
          >
            <FilePlus2 className="size-5" />
            <span>New Canvas</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
          {canvasItems.map((item, i) => (
            <Link
              key={item.id}
              href={`/canvas/${item.id}`}
              className="group relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative p-6">
                <div className="text-white text-lg font-medium">
                  Canvas {i + 1}
                </div>
                <div className="mt-2 text-white/60">
                  Click to open this canvas
                </div>
              </div>
            </Link>
          ))}

          {canvasItems.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-white/80">
              <div className="text-xl font-medium mb-4">No canvases yet</div>
              <div className="text-white/60">
                Create your first canvas to get started
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
