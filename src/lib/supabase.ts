import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

import type { Database } from '@/types/database';
import { SUPABASE_ANON_KEY, SUPABASE_URL } from './env';

// AsyncStorage is required for session persistence in React Native.
// Supabase's default storage uses localStorage which doesn't exist in RN.
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false, // not applicable in RN; suppresses a console warning
  },
});
