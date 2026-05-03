import { NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/supabase-auth-request";
import { getSupabaseAdmin } from "@/supabase_admin";

/** 30-day usage counts for the signed-in user (bypasses RLS). */
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

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const since = thirtyDaysAgo.toISOString();
    const uid = String(user.id);

    const [created, edited] = await Promise.all([
      admin
        .from("images_created")
        .select("id", { count: "exact", head: true })
        .eq("user_id", uid)
        .gte("created_at", since),
      admin
        .from("images_edited")
        .select("id", { count: "exact", head: true })
        .eq("user_id", uid)
        .gte("created_at", since),
    ]);

    if (created.error) {
      return NextResponse.json({ error: created.error.message }, { status: 500 });
    }
    if (edited.error) {
      return NextResponse.json({ error: edited.error.message }, { status: 500 });
    }

    return NextResponse.json({
      created: created.count ?? 0,
      edited: edited.count ?? 0,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
