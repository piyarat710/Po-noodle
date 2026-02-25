import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  "https://ztkumfyjtwnovbtlaebr.supabase.co";

const supabaseKey =
  "sb_publishable_tJGwKX6eP2E_BH4h6CqojA_u7Pvv6Nn";

export const supabase =
  createClient(supabaseUrl, supabaseKey);
