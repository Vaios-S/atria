import { supabase } from "../lib/supabase";

export async function runDevSupabaseActivity() {
  if (!import.meta.env.DEV) return;

  await Promise.all([
    supabase.from("spaces").select("id").limit(1),
    supabase.from("quests").select("id").limit(1),
    supabase.from("space_section").select("id").limit(1),
    supabase.from("checklist_items").select("id").limit(1),
    supabase.from("notes").select("id").limit(1),
  ]);
}
