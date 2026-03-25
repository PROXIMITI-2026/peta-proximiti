import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// NOTE: Once you run `npx supabase gen types typescript` on your actual
// Supabase project, replace this with: createClient<Database>(...)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
