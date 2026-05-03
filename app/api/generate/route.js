import { getSupabaseAdmin } from "@/supabase_admin";
import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: `${process.env.REPLICATE_API_TOKEN}`,
});

export async function POST(req, res) {
  try {
    const { prompt, imageParams, canvas, userId } = await req.json();
    const startResponse = await replicate.predictions.create({
      version: imageParams.model,
      input: {
        prompt: `${prompt}, ${imageParams.filter}`,
        width: imageParams.dimension.width,
        height: imageParams.dimension.height,
        num_outputs: imageParams.number,
        seed: imageParams.seed,
        negative_prompt: "worst quality, low quality",
        num_inference_steps: imageParams.model.startsWith("5f")
          ? 4
          : imageParams.model.startsWith("77")
          ? 25
          : 50,
        guidance_scale: imageParams.model.startsWith("5f") ? 0 : 7.5,
        scheduler: "K_EULER",
        prompt_strength: imageParams.model.startsWith("77") && 0.8,
        refine: imageParams.model.startsWith("77") && "expert_ensemble_refiner",
        high_noise_frac: imageParams.model.startsWith("77") && 0.8,
        lora_scale: imageParams.model.startsWith("77") && 0.6,
      },
    });
    let Response_Id = startResponse.id;
    let output = null;
    while (!output) {
      // Loop in 1s intervals until the alt text is ready
      let finalResponse = await replicate.predictions.get(Response_Id);
      if (finalResponse.status === "succeeded") {
        output = finalResponse.output;
      } else if (finalResponse.status === "failed") {
        break;
      } else {
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }
    }

    if (!output) {
      return NextResponse.json(
        { error: "Replicate did not return image output" },
        { status: 502 }
      );
    }

    // Models may return one URL string or an array of URLs — avoid iterating string chars.
    const urls = Array.isArray(output) ? output : [output];

    const supabaseAdmin = getSupabaseAdmin();
    if (!supabaseAdmin) {
      return NextResponse.json(
        {
          error:
            "Missing SUPABASE_SERVICE_ROLE_KEY — server cannot save images when RLS is enabled. Add it in .env.local (Project Settings → API in Supabase).",
        },
        { status: 500 }
      );
    }

    let insertedCount = 0;
    for (const url of urls) {
      if (typeof url !== "string" || !/^https?:\/\//i.test(url)) {
        console.warn("Skipping non-URL replicate output:", url);
        continue;
      }
      const { error: insertError } = await supabaseAdmin
        .from("images_created")
        .insert([
          {
            canvas_id: String(canvas),
          url,
          prompt,
          filter: imageParams.filter,
          user_id: userId != null ? String(userId) : userId,
          },
        ]);
      if (insertError) {
        console.error("images_created insert failed:", insertError);
        return NextResponse.json(
          { error: insertError.message, detail: insertError },
          { status: 500 }
        );
      }
      insertedCount++;
    }

    if (insertedCount === 0) {
      return NextResponse.json(
        {
          error:
            "Replicate returned output in an unexpected shape — no HTTP URLs were saved",
          replicateOutput: output,
        },
        { status: 502 }
      );
    }

    return NextResponse.json(Array.isArray(output) ? output : urls);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
