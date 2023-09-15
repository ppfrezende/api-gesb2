import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://eqnqmpzeyldkgstjtqdj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxbnFtcHpleWxka2dzdGp0cWRqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MjM3NzE5NywiZXhwIjoyMDA3OTUzMTk3fQ.f9xZQLDAdAs_s-URj_zkawYQUQWFYdovVeeHugirvI0',
  {
    auth: {
      persistSession: false,
    },
  },
);
