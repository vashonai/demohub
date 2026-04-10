import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nturaqbtphxgipbfklnl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50dXJhcWJ0cGh4Z2lwYmZrbG5sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4MjUyNzcsImV4cCI6MjA5MTQwMTI3N30.S2ZHBd1FSAe2ASBZCecclwyte35U65ml7N45apybsTY';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testFetch() {
  const { data, error } = await supabase.from('projects').select('*').limit(2);
  console.log('Data:', data);
  console.log('Error:', error);
}

testFetch();
