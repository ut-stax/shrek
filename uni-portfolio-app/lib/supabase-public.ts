import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/database.types";

let publicClient: SupabaseClient<Database> | null = null;

export function createClientInstance() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase public environment variables");
  }

  if (!publicClient) {
    publicClient = createClient<Database>(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }

  return publicClient;
}

export { createClientInstance as createClient };