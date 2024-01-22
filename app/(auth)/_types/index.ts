import { z } from 'zod';
import { LoginSchema, RegisterSchema } from '@/app/(auth)/_schema';

interface AuthFormData {
  email: string;
  password: string;
}
export interface LoginFormData extends AuthFormData {}

export interface RegisterFormData extends AuthFormData {
  confirmPassword: string;
}

export type LoginInputs = z.infer<typeof LoginSchema>;
export type RegistrationInputs = z.infer<typeof RegisterSchema>;
