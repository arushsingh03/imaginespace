import { createClient } from "@supabase/supabase-js";
import { supabaseProjectUrl } from "./supabase_config";

/**
 * Server-only client with elevated privileges for API routes.
 * Never import this from client components — keep SUPABASE_SERVICE_ROLE_KEY server-side only.
 */
export function getSupabaseAdmin() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) return null;
  return createClient(supabaseProjectUrl, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
