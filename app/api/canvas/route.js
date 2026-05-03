import { NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/supabase-auth-request";
import { getSupabaseAdmin } from "@/supabase_admin";

/** Create canvas row — bypasses client RLS (same pattern as /api/generate). */
export async function POST(req) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const canvas_id = body?.canvas_id;
    if (!canvas_id || typeof canvas_id !== "string") {
      return NextResponse.json(
        { error: "canvas_id (uuid string) is required" },
        { status: 400 }
      );
    }

    if (body?.user_id && body.user_id !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const admin = getSupabaseAdmin();
    if (!admin) {
      return NextResponse.json(
        { error: "Missing SUPABASE_SERVICE_ROLE_KEY on server" },
        { status: 500 }
      );
    }

    const { data, error } = await admin
      .from("canvas")
      .insert([{ canvas_id, user_id: String(user.id) }])
      .select();

    if (error) {
      console.error("canvas insert failed:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data?.[0] ?? null);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}

/** List canvases for the authenticated user — uses admin after JWT check so RLS on canvas is optional. */
export async function GET(req) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const admin = getSupabaseAdmin();
    if (!admin) {
      return NextResponse.json(
        { error: "Missing SUPABASE_SERVICE_ROLE_KEY on server" },
        { status: 500 }
      );
    }

    const { data, error } = await admin
      .from("canvas")
      .select()
      .eq("user_id", String(user.id))
      .order("created_at", { ascending: false });

    if (error) {
      console.error("canvas select failed:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data ?? []);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
