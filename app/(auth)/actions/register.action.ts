'use server';

import createSupabaseServerClient from '@/lib/supabase/server';
import { AuthResponse } from '@supabase/gotrue-js';
import { SupabaseClient } from '@supabase/supabase-js';
import { RegisterFormData } from '@/app/(auth)/types/form';

export async function registerWithEmailAndPassword(data: RegisterFormData) {
  const supabase: SupabaseClient = await createSupabaseServerClient();

  const payload = {
    email: data.email,
    password: data.password,
  };
  const result: AuthResponse = await supabase.auth.signUp(payload);

  return JSON.stringify(result);
}
