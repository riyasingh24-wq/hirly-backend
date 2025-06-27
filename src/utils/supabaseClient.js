// src/utils/supabaseClient.js
// Exports a configured Supabase client for use in authentication and other features
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Check if required environment variables are available
if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️  Supabase environment variables not found. Creating mock client for development/testing.');
}

// Create mock client for testing/development when env vars are not available
const mockSupabase = {
  auth: {
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
    signInWithPassword: () => Promise.resolve({ data: { user: null }, error: null }),
    signUp: () => Promise.resolve({ data: { user: null }, error: null }),
    signOut: () => Promise.resolve({ error: null })
  },
  from: () => ({
    select: () => Promise.resolve({ data: [], error: null }),
    insert: () => Promise.resolve({ data: null, error: null }),
    update: () => Promise.resolve({ data: null, error: null }),
    delete: () => Promise.resolve({ data: null, error: null })
  })
};

// Export real Supabase client when environment variables are available, otherwise mock
const supabase = (supabaseUrl && supabaseKey) 
  ? createClient(supabaseUrl, supabaseKey) 
  : mockSupabase;

export default supabase; 