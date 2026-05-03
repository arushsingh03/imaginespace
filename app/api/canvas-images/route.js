import { NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/supabase-auth-request";
import { getSupabaseAdmin } from "@/supabase_admin";

/**
 * Load images for a canvas. Uses service role after JWT check so RLS on
 * images_created / images_edited cannot hide rows from the client.
 */
export async function GET(req) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const canvasId = searchParams.get("canvas_id");
    if (!canvasId) {
      return NextResponse.json(
        { error: "canvas_id query parameter is required" },
        { status: 400 }
      );
    }

    const admin = getSupabaseAdmin();
    if (!admin) {
      return NextResponse.json(
        { error: "Missing SUPABASE_SERVICE_ROLE_KEY on server" },
        { status: 500 }
      );
    }

    const uid = String(user.id);

    const [created, edited] = await Promise.all([
      admin
        .from("images_created")
        .select()
        .eq("canvas_id", canvasId)
        .eq("user_id", uid)
        .order("created_at", { ascending: false }),
      admin
        .from("images_edited")
        .select()
        .eq("canvas_id", canvasId)
        .eq("user_id", uid)
        .order("created_at", { ascending: false }),
    ]);

    if (created.error) {
      console.error("images_created select failed:", created.error);
      return NextResponse.json(
        { error: created.error.message },
        { status: 500 }
      );
    }
    if (edited.error) {
      console.error("images_edited select failed:", edited.error);
      return NextResponse.json(
        { error: edited.error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      created: created.data ?? [],
      edited: edited.data ?? [],
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
