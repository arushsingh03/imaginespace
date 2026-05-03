import { createClient } from "@supabase/supabase-js";
import { supabaseProjectUrl } from "./supabase_config";

const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
export const supabase = createClient(supabaseProjectUrl, supabaseKey);