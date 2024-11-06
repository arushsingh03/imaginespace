"use client";

import GalaxyBackground from "@/app/(comps)/galaxy";
import Header from "@/app/(comps)/header";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Textarea } from "@/components/ui/textarea";
import useUser from "@/hooks/useUser";
import { supabase } from "@/supabase_client";
import { Download, Edit, X } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const filters = [
  { name: "Photorealism", value: "Photorealism" },
  { name: "unreal engine", value: "unreal engine" },
  { name: "Real Cartoon XL", value: "Real Cartoon XL" },
  { name: "Blue Pencil XL", value: "Blue Pencil XL" },
  { name: "Starlight XL Animated", value: "Starlight XL Animated" },
  { name: "Juggernaut XL", value: "Juggernaut XL" },
  { name: "RealVis XL", value: "RealVis XL" },
  { name: "Zavy Chroma XL", value: "Zavy Chroma XL" },
  { name: "NightVision XL", value: "NightVision XL" },
  { name: "Realistic Stock Photo", value: "Realistic Stock Photo" },
  { name: "Dreamshaper", value: "Dreamshaper" },
  { name: "MBBXL", value: "MBBXL" },
  { name: "Mysterious", value: "Mysterious" },
  { name: "Copax Timeless", value: "Copax Timeless" },
  { name: "Niji SE", value: "Niji SE" },
  { name: "Pixel Art", value: "Pixel Art" },
  { name: "ProtoVision", value: "ProtoVision" },
  { name: "DucHaiten", value: "DucHaiten" },
  { name: "Counterfeit", value: "Counterfeit" },
  { name: "Vibrant Glass", value: "Vibrant Glass" },
  { name: "Bella's Dreamy Stickers", value: "Bella's Dreamy Stickers" },
  { name: "Ultra Lighting", value: "Ultra Lighting" },
  { name: "Watercolor", value: "Watercolor" },
  { name: "Macro Realism", value: "Macro Realism" },
  { name: "Delicate detail", value: "Delicate detail" },
  { name: "Radiant symmetry", value: "Radiant symmetry" },
  { name: "Lush illumination", value: "Lush illumination" },
  { name: "Saturated Space", value: "Saturated Space" },
  { name: "Neon Mecha", value: "Neon Mecha" },
  { name: "Ethereal Low poly", value: "Ethereal Low poly" },
  { name: "Warm box", value: "Warm box" },
  { name: "Cinematic", value: "Cinematic" },
];
let models = [
  {
    name: "stable-diffusion",
    version: "ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
  },
  {
    name: "bytedance/sdxl-lightning",
    version: "5f24084160c9089501c1b3545d9be3c27883ae2239b6f412990e82d4a6210f8f",
  },
  {
    name: "stable-diffusion XL",
    version: "7762fd07cf82c948538e41f63f77d685e02b063e37e496e96eefd46c929f9bdc",
  },
];
const dimensions = [
  { id: 1, width: 512, height: 512 },
  { id: 2, width: 1024, height: 1024 },
  { id: 3, width: 640, height: 384 },
  { id: 4, width: 384, height: 640 },
  { id: 5, width: 768, height: 512 },
  { id: 6, width: 512, height: 768 },
];
let imagesNumbers = [
  { name: 1, value: "1 image" },
  { name: 2, value: "2 images" },
  { name: 3, value: "3 images" },
  { name: 4, value: "4 images" },
];

export default function CanvasPage() {
  let initialParams = {
    filter: filters[0].value,
    model: models[1].version,
    dimension: dimensions[1],
    seed: 0,
    number: 1,
  };
  const [prompt, setPrompt] = useState("");
  const [imageParams, setImageParams] = useState(initialParams);
  const [createdImages, setCreatedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { canvasId } = useParams();
  const [user] = useUser();
  const [selectedImage, setSelectedImage] = useState("");
  const [OpenDialog, setOpenDialog] = useState(false);
  const [editingCommand, setEditingCommand] = useState("");
  const generateImages = async () => {
    if (prompt.trim() == "" || !prompt) return;
    let payload = {
      prompt,
      imageParams,
      canvas: canvasId,
      userId: user.id,
    };
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        fetchNewImages();
      }, 3000);
    }
  };
  const fetchNewImages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("images_created")
      .select()
      .eq("canvas_id", canvasId)
      .order("created_at", { ascending: false });
    setCreatedImages(data);
    setLoading(false);
    setPrompt("");
    setImageParams(initialParams);
  };
  useEffect(() => {
    if (!supabase || !canvasId) return;
    fetchNewImages();
  }, [supabase, canvasId]);

  return (
    <div className="min-h-screen bg">
      <Header />
      <div className="grid grid-cols-5 w-full text-white min-h-screen">
        {/* Left Sidebar - Filters + Prompt */}
        <div className="col-span-1 min-h-screen overflow-y-auto py-8 px-6 space-y-8 backdrop-blur-sm bg-white/5">
          <GalaxyBackground />
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-xl font-medium text-white/90">Filter</h3>
              <p className="text-sm text-white/70">
                Explore a variety of artistic styles and effects to enhance the
                visual impact of your image.
              </p>
            </div>
            <Select
              value={imageParams.filter}
              onValueChange={(value) =>
                setImageParams((curr) => ({
                  ...curr,
                  filter: value,
                }))
              }
            >
              <SelectTrigger className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 transition-colors">
                <SelectValue placeholder="Select desired filter" />
              </SelectTrigger>
              <SelectContent className="h-[210px] bg-slate-900/95 border-white/20 text-white backdrop-blur-md">
                {filters.map((filter) => (
                  <SelectItem
                    key={filter.value}
                    value={filter.value}
                    className="cursor-pointer hover:bg-white/10 focus:bg-white/20"
                  >
                    {filter.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-xl font-medium text-white/90">Prompt</h3>
              <p className="text-sm text-white/70">
                Describe your desired outcome. Be as detailed as you like!
              </p>
            </div>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[30vh] bg-transparent border-white/80 text-white resize-none p-4 focus:ring-2 ring-cyan-500/50 transition-all"
              placeholder="Enter your prompt here... "
            />
          </div>

          <button
            onClick={generateImages}
            className="w-full py-3 px-6 bg-gradient-to-r  from-violet-950 to-fuchsia-950 rounded-lg font-medium text-white hover:opacity-80 transition-all duration-200 shadow-lg shadow-white/40 ring-offset-0 hover:shadow-white/80"
          >
            Generate
          </button>
        </div>

        {/* Center - Image Display */}
        <div className="col-span-3 items-center justify-start w-full flex flex-col min-h-screen border-x border-white/10">
          {selectedImage && (
            <div className="w-full sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-white/10">
              <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-4">
                  <Link
                    href={selectedImage.url}
                    target="_blank"
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors rounded-md border border-white/10 hover:bg-white/5"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </Link>
                  <Dialog open={OpenDialog}>
                    <DialogTrigger
                      onClick={() => setOpenDialog(true)}
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors rounded-md border border-white/10 hover:bg-white/5"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </DialogTrigger>
                    <DialogContent
                      onInteractOutside={() => setOpenDialog(false)}
                      className="bg-black/95 text-white py-8 filter backdrop-blur-md border-white/20 border"
                    >
                      <DialogHeader>
                        <DialogTitle className="text-xl font-semibold mb-4">
                          What do you want to do with this image?
                        </DialogTitle>
                        <DialogDescription>
                          <div className="w-full items-center justify-center flex flex-col space-y-3">
                            <div className="w-full py-4 max-h-[60vh] overflow-y-auto pr-4">
                              {/* Remove bg */}
                              <div
                                onClick={() =>
                                  setEditingCommand("Remove Background")
                                }
                                className={`p-4 rounded-lg transition-all duration-200 cursor-pointer ${
                                  editingCommand === "Remove Background"
                                    ? "bg-white/10 border border-white"
                                    : "hover:bg-white/5 border border-white/10"
                                }`}
                              >
                                <p className="font-medium text-sm">
                                  Remove Background
                                </p>
                                {editingCommand === "Remove Background" && (
                                  <p className="text-xs text-white/60 mt-1 italic">
                                    remove the background of this image
                                  </p>
                                )}
                              </div>
                              {/* upscale */}
                              <div
                                onClick={() => setEditingCommand("upscale")}
                                className={`p-4 rounded-lg transition-all duration-200 cursor-pointer mt-3 ${
                                  editingCommand === "upscale"
                                    ? "bg-white/10 border border-white"
                                    : "hover:bg-white/5 border border-white/10"
                                }`}
                              >
                                <p className="font-medium text-sm">Upscale</p>
                                {editingCommand === "upscale" && (
                                  <p className="text-xs text-white/60 mt-1 italic">
                                    create higher-quality image from this image
                                  </p>
                                )}
                              </div>
                              {/* caption */}
                              <div
                                onClick={() => setEditingCommand("captionize")}
                                className={`p-4 rounded-lg transition-all duration-200 cursor-pointer mt-3 ${
                                  editingCommand === "captionize"
                                    ? "bg-white/10 border border-white"
                                    : "hover:bg-white/5 border border-white/10"
                                }`}
                              >
                                <p className="font-medium text-sm">
                                  Captionize
                                </p>
                                {editingCommand === "captionize" && (
                                  <p className="text-xs text-white/60 mt-1 italic">
                                    generate detailed caption for this images
                                  </p>
                                )}
                              </div>
                              {/* restore ai_face */}
                              <div
                                onClick={() =>
                                  setEditingCommand("restore faces")
                                }
                                className={`p-4 rounded-lg transition-all duration-200 cursor-pointer mt-3 ${
                                  editingCommand === "restore faces"
                                    ? "bg-white/10 border border-white"
                                    : "hover:bg-white/5 border border-white/10"
                                }`}
                              >
                                <p className="font-medium text-sm">
                                  Restore Faces
                                </p>
                                {editingCommand === "restore faces" && (
                                  <p className="text-xs text-white/60 mt-1 italic">
                                    face restoration for any AI-generated faces
                                    in this image
                                  </p>
                                )}
                              </div>
                              {/* restore old_photo */}
                              <div
                                onClick={() =>
                                  setEditingCommand("restore old photo")
                                }
                                className={`p-4 rounded-lg transition-all duration-200 cursor-pointer mt-3 ${
                                  editingCommand === "restore old photo"
                                    ? "bg-white/10 border border-white"
                                    : "hover:bg-white/5 border border-white/10"
                                }`}
                              >
                                <p className="font-medium text-sm">
                                  Recover Old Images
                                </p>
                                {editingCommand === "restore old photo" && (
                                  <p className="text-xs text-white/60 mt-1 italic">
                                    bring your old photos back to life
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
                <button
                  onClick={() => {
                    setSelectedImage("");
                    setPrompt("");
                  }}
                  className="p-2 rounded-md hover:bg-white/5 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Horizontal scrolling image gallery */}
          <div className="w-full flex-none">
            <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              <div className="flex min-h-[400px] space-x-4 p-6">
                {createdImages.map((image) => (
                  <div
                    key={image.id}
                    className={`flex-none group relative w-[300px] h-[300px] overflow-hidden rounded-lg border transition-all duration-200 
              ${
                image.url === selectedImage?.url
                  ? "border-white ring-2 ring-white"
                  : "border-white/10 hover:border-white/20"
              }`}
                  >
                    <img
                      onClick={() => {
                        setSelectedImage(image);
                        setPrompt(image.prompt);
                        setImageParams((curr) => ({
                          ...curr,
                          model: models[2].version,
                        }));
                      }}
                      src={image.url}
                      alt={image.prompt}
                      className="w-full h-full object-cover cursor-pointer transition-opacity duration-200 group-hover:opacity-75"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Empty state */}
          {createdImages.length === 0 && (
            <div className="h-[400px] w-full flex items-center justify-center">
              <div className="text-center text-white/60">
                Your generated images will appear here
              </div>
            </div>
          )}

          {/* Space for edited images below */}
          <div className="w-full flex-1">
            {/* Your edited images content will go here */}
          </div>
        </div>
        {/* Right Sidebar - Parameters */}
        <div className="col-span-1 min-h-screen overflow-y-auto py-8 px-6 space-y-8 backdrop-blur-sm bg-white/5">
          <GalaxyBackground />
          {/* Model Selection */}
          <div className="space-y-4 pb-6 border-b border-white/10">
            <h3 className="text-lg font-medium text-white/90">Model</h3>
            <Select
              value={imageParams.model}
              onValueChange={(value) =>
                setImageParams((curr) => ({
                  ...curr,
                  model: value,
                }))
              }
            >
              <SelectTrigger className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 transition-colors">
                <SelectValue placeholder="Select the version" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900/95 border-white/20 text-white backdrop-blur-md">
                {models.map((model) => (
                  <SelectItem
                    key={model.version}
                    value={model.version}
                    className="cursor-pointer hover:bg-white/10"
                  >
                    {model.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Dimensions */}
          <div className="space-y-4 pb-6 border-b border-white/10">
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-white/90">
                Image Dimensions
              </h3>
              <p className="text-sm text-white/70">
                Width X Height of the Image
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {dimensions.map((dimension) => (
                <button
                  onClick={() =>
                    setImageParams((curr) => ({ ...curr, dimension }))
                  }
                  key={dimension.id}
                  className={`px-3 py-2 text-sm border border-white/20 rounded-lg hover:bg-white/10 transition-colors duration-200
                    ${
                      imageParams.dimension.height == dimension.height &&
                      imageParams.dimension.width == dimension.width
                        ? "bg-white text-black hover:text-white smooth"
                        : ""
                    }
                    `}
                >
                  {`${dimension.width} x ${dimension.height}`}
                </button>
              ))}
            </div>
          </div>

          {/* Seed */}
          <div className="space-y-4 pb-6 border-b border-white/10">
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-white/90">Seed</h3>
              <p className="text-sm text-white/70">
                Each number unveils a new style for your image—experiment to see
                the difference.
              </p>
            </div>
            <input
              value={imageParams.seed}
              onChange={(e) =>
                setImageParams((curr) => ({
                  ...curr,
                  seed: parseInt(e.target.value),
                }))
              }
              type="number"
              placeholder="0"
              min={0}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:ring-2 ring-cyan-500/50 transition-all"
            />
          </div>

          {/* Number of Images */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-white/90">
                Number of Images to Generate
              </h3>
              <p className="text-sm text-white/70">
                Pick your preferred generation count
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {imagesNumbers.map((number) => (
                <button
                  onClick={() =>
                    setImageParams((curr) => ({ ...curr, number: number.name }))
                  }
                  key={number.value}
                  className={`px-3 py-2 text-sm border border-white/20 rounded-lg hover:bg-white/10 transition-colors duration-200 ${
                    imageParams.number == number.name &&
                    "bg-white text-black hover:text-white smooth"
                  }`}
                >
                  {number.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
