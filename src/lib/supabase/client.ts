import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://zavnlcenctkjmgboixbz.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inphdm5sY2VuY3Rram1nYm9peGJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkyMTEzNTAsImV4cCI6MjEwNDc4NzM1MH0.uSBAET46iSw1fgZ1xPjPFo08IJS_x4LSp6jt6rloL1c';

export function isSupabaseConfigured(): boolean {
  return true;
}

export function createClient() {
  // Always use the validated project URL and anon key
  return createSupabaseClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      persistSession: true,
      autoRefreshToken: true
    }
  });
}
