import { createClient } from '@supabase/supabase-js';

const FALLBACK_SUPABASE_URL = 'https://keyoinvwcrjrdonvzzeb.supabase.co';
const FALLBACK_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtleW9pbnZ3Y3JqcmRvbnZ6emViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUzNTAzOTgsImV4cCI6MjA5MDkyNjM5OH0.CqF6HaLrN2Du23s0M7kEQH1bSpbX28kprDGqy1riqwc';

const envSupabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const envSupabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseUrl = !envSupabaseUrl || envSupabaseUrl.includes('rqtcdnwqysqegiulmoxk')
  ? FALLBACK_SUPABASE_URL
  : envSupabaseUrl;

const supabaseAnonKey = !envSupabaseAnonKey || envSupabaseAnonKey.includes('rqtcdnwqysqegiulmoxk')
  ? FALLBACK_SUPABASE_ANON_KEY
  : envSupabaseAnonKey;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
