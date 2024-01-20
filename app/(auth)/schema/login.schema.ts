import { z, ZodType } from 'zod';
import { LoginFormData } from '@/app/(auth)/types/form';

export const LoginSchema: ZodType<LoginFormData> = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email('Invalid email address. Please enter a valid email address'),
  password: z.string().min(1, { message: 'Password is required' }),
});
