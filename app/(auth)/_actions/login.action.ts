'use server';

import { AuthResponse } from '@supabase/gotrue-js';
import { SupabaseClient } from '@supabase/supabase-js';
import createSupabaseServerClient from '@/lib/supabase/server';
import { LoginFormData } from '../_types/form';

export async function loginWithEmailAndPassword(data: LoginFormData) {
  const supabase: SupabaseClient = await createSupabaseServerClient();
  const result: AuthResponse = await supabase.auth.signInWithPassword(data);
  return JSON.stringify(result);
}
