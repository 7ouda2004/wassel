import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pnhwskxbhtgzckyjkvtn.supabase.co';
const supabaseKey = 'sb_publishable_JPHYVymHQ9iFjLigksc6Hw_3YbTiGJR';

export const isSupabaseConfigured = true;
export const supabase = createClient(supabaseUrl, supabaseKey);
