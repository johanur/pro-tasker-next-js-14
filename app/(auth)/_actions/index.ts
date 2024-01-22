'use server';

import { LoginFormData, RegisterFormData } from '@/app/(auth)/_types/form';
import { SupabaseClient } from '@supabase/supabase-js';
import createSupabaseServerClient from '@/lib/supabase/server';
import { AuthResponse } from '@supabase/gotrue-js';

export async function loginWithEmailAndPassword(data: LoginFormData) {
  const supabase: SupabaseClient = await createSupabaseServerClient();
  const result: AuthResponse = await supabase.auth.signInWithPassword(data);
  return JSON.stringify(result);
}

export async function registerWithEmailAndPassword(data: RegisterFormData) {
  const supabase: SupabaseClient = await createSupabaseServerClient();

  const payload = {
    email: data.email,
    password: data.password,
  };
  const result: AuthResponse = await supabase.auth.signUp(payload);

  return JSON.stringify(result);
}
