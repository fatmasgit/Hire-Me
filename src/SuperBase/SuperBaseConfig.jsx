import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
export const supabase = createClient(
  'https://lzrtattnbnzoddfntnit.supabase.co', // Replace with your Supabase URL
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6cnRhdHRuYm56b2RkZm50bml0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3NDM5ODMsImV4cCI6MjA2NjMxOTk4M30.RRzz3cN8Ep2M4jolr6z8gHv2N_icqWpnr6lrs49v9_U');