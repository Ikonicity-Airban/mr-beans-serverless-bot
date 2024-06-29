import { createClient } from "@supabase/supabase-js";
import { supabaseAdapter } from "@grammyjs/storage-supabase";
import { Database, SessionData } from "../@types";

const supabaseUrl = "https://hvqaylohnjgyulxnzrkv.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseKey!);

export const storage = supabaseAdapter<SessionData>({
	supabase,
	table: "session", // the defined table name you want to use to store your session
});
