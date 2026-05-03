import { createClient } from "@supabase/supabase-js";
import { supabaseProjectUrl } from "@/supabase_config";

/** Resolve the Supabase user from a request's Bearer access token (for API routes). */
export async function getUserFromRequest(req) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;

  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
  if (!anonKey) return null;

  const supabase = createClient(supabaseProjectUrl, anonKey, {
    global: { headers: { Authorization: authHeader } },
  });

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) return null;
  return user;
}
