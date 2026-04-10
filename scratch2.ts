import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nturaqbtphxgipbfklnl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50dXJhcWJ0cGh4Z2lwYmZrbG5sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4MjUyNzcsImV4cCI6MjA5MTQwMTI3N30.S2ZHBd1FSAe2ASBZCecclwyte35U65ml7N45apybsTY';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testDelete() {
  const { data: testData } = await supabase.from('projects').insert({ name: 'Test Delete', category: 'Testing' }).select();
  console.log('Inserted:', testData);
  if (testData && testData.length > 0) {
    const { data: delData, error: delError } = await supabase.from('projects').delete().eq('id', testData[0].id).select();
    console.log('Deleted data:', delData);
    console.log('Deleted error:', delError);
  }
}

testDelete();
