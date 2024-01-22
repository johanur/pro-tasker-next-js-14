'use server';

import createSupabaseServerClient from '@/lib/supabase/server';
import { SupabaseClient } from '@supabase/supabase-js';
import { AuthResponse, AuthTokenResponsePassword } from '@supabase/gotrue-js';
import { LoginFormData, RegisterFormData } from '@/app/(auth)/_types';

export async function loginWithEmailAndPassword(data: LoginFormData): Promise<AuthTokenResponsePassword> {
  const supabase: SupabaseClient = await createSupabaseServerClient();
  return supabase.auth.signInWithPassword(data);
}

export async function registerWithEmailAndPassword(data: RegisterFormData): Promise<AuthResponse> {
  const supabase: SupabaseClient = await createSupabaseServerClient();

  const payload = {
    email: data.email,
    password: data.password,
  };
  return supabase.auth.signUp(payload);
}
