import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// 🔍 Debug logs
console.log("SUPABASE_URL:", supabaseUrl);
console.log("SUPABASE_KEY:", supabaseKey ? "Loaded" : "Missing");

// ❌ Stop if env not loaded
if (!supabaseUrl || !supabaseKey) {
  throw new Error("❌ Supabase ENV variables not loaded properly");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;