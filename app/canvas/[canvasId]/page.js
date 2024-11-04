"use client";

import Header from "@/app/(comps)/header";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

export default function CanvasPage() {
  return (
    <div className="min-h-screen bg items-center justify-center flex flex-col w-full text-white">
      {/* header */}
      <Header />
      <div className="grid grid-cols-5 bg w-full text-white min-h-screen">
        {/* filtersss + promp */}
        <div className="col-span-1 min-h-screen overflow-y-auto py-12 px-6 space-y-6">
          <div>
            <h3 className="text-white font-bold text-2xl pb-2">Filter</h3>
            <p className="text-white w-full pb-6 text-lg">
              Explore a variety of artistic styles and effects to enhance the
              visual impact of your image, such as modern gradients, bold
              shadows, or vibrant color overlays.
            </p>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select desired filter" />
              </SelectTrigger>
              <SelectContent className="h-[210px]">
                {filters.map((filter) => (
                  <SelectItem
                    key={filter.value}
                    value={filter.value}
                    className="cursor-pointer"
                  >
                    {filter.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <h3>Prompt</h3>
          </div>
        </div>
        {/* img display*/}
        <div className="col-span-3"></div>
        {/* image parameters */}
        <div className="col-span-1 min-h-screen overflow-y-auto py-12 px-6 space-y-8"></div>
      </div>
    </div>
  );
}
