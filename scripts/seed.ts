import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { applications } from '../src/data/apps';
import { join } from 'path';

// Load variables from .env.local
dotenv.config({ path: join(process.cwd(), '.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'YOUR_SUPABASE_URL_HERE') {
  console.error('Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seed() {
  console.log(`Seeding ${applications.length} projects to Supabase...`);
  
  // Format data for insertion (ignoring our old local string ID so Supabase makes UUIDs)
  const dataToInsert = applications.map(app => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...appData } = app;
    return appData;
  });

  const { data, error } = await supabase
    .from('projects')
    .insert(dataToInsert);

  if (error) {
    console.error('Error inserting projects:', error);
  } else {
    console.log('Successfully seeded database!');
  }
}

seed();
