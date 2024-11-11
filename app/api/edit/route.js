import { supabase } from "@/supabase_client";
import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: `${process.env.REPLICATE_API_TOKEN}`,
});

export async function POST(req, res) {
  try {
    const { imageUrl, command, canvas, userId } = await req.json();
    const details =
      command == "Remove Background"
        ? {
            version:
              "fb8af171cfa1616ddcf1242c093f9c46bcada5ad4cf6f2fbe8b81b330ec5c003",
            input: {
              image: `${imageUrl}`,
            },
          }
        : command == "Upscale"
        ? {
            version:
              "f121d640bd286e1fdc67f9799164c1d5be36ff74576ee11c803ae5b665dd46aa",
            input: {
              image: `${imageUrl}`,
              scale: 2,
              face_enhance: true,
            },
          }
        : command == "Captionize"
        ? {
            version:
              "2e1dddc8621f72155f24cf2e0adbde548458d3cab9f00c0139eea840d0ac4746",
            input: {
              task: "image_captioning",
              image: `${imageUrl}`,
            },
          }
        : command == "Restore Faces"
        ? {
            version:
              "7de2ea26c616d5bf2245ad0d5e24f0ff9a6204578a5c876db53142edd9d2cd56",
            input: {
              image: `${imageUrl}`,
              upscale: 2,
              face_upsample: true,
              background_enhance: true,
              codeformer_fidelity: 0.1,
            },
          }
        : command == "Recover Old Images"
        ? {
            version:
              "c75db81db6cbd809d93cc3b7e7a088a351a3349c9fa02b6d393e35e0d51ba799",
            input: {
              image: `${imageUrl}`,
              HR: false,
              with_scratch: false,
            },
          }
        : null;

    if (!details) {
      return NextResponse.json({ error: "Invalid command" }, { status: 400 });
    }

    const startResponse = await replicate.predictions.create(details);
    let Response_Id = startResponse.id;
    let output = null;

    while (!output) {
      // Loop in 1s intervals until the alt text is ready
      let finalResponse = await replicate.predictions.get(Response_Id);
      if (finalResponse.status === "succeeded") {
        output = finalResponse.output;
      } else if (finalResponse.status === "failed") {
        console.error("Replicate API failed:", finalResponse);
        break;
      } else {
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }
    }

    if (!output) {
      return NextResponse.json({ error: "Failed to retrieve output" }, { status: 500 });
    }

    if (command === "Captionize") {
      await supabase.from("images_edited").insert([
        {
          canvas_id: canvas,
          url: imageUrl,
          caption: output.split(":")[1],
          user_id: userId,
        },
      ]);
    } else {
      await supabase.from("images_edited").insert([
        {
          canvas_id: canvas,
          url: output,
          user_id: userId,
        },
      ]);
    }

    return NextResponse.json(output);
  } catch (error) {
    console.error("Error processing image:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
