'use server';

import { SupabaseClient } from '@supabase/supabase-js';
import { AuthResponse } from '@supabase/gotrue-js';
import createSupabaseServerClient from '@/lib/supabase/server';
import { RegisterFormData } from '../_types/form';

export async function registerWithEmailAndPassword(data: RegisterFormData) {
  const supabase: SupabaseClient = await createSupabaseServerClient();

  const payload = {
    email: data.email,
    password: data.password,
  };
  const result: AuthResponse = await supabase.auth.signUp(payload);

  return JSON.stringify(result);
}
