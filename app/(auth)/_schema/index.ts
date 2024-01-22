import { z, ZodType } from 'zod';
import { LoginFormData, RegisterFormData } from '../_types';

export const LoginSchema: ZodType<LoginFormData> = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email('Invalid email address. Please enter a valid email format (e.g., example@example.com)'),
  password: z.string()
    .min(1, { message: 'Password is required'})
});

export const RegisterSchema: ZodType<RegisterFormData> = z
  .object({
    email: z
      .string()
      .min(1, { message: 'Email is required' })
      .email('Invalid email address. Please enter a valid email format (e.g., example@example.com)'),
    password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Password and Confirm Password do not match',
    path: ['confirmPassword'], // path of error
  });
