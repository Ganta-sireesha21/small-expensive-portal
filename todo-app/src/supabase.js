import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cukvyudvavwkzyexudpp.supabase.co";
const supabaseKey = "sb_publishable_Lt8IHolOZ06XTho2G7jDFA_85JzMUCK";

export const supabase = createClient(supabaseUrl, supabaseKey);