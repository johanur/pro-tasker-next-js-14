import { z, ZodType } from 'zod';
import { CategoryFormData, TodoFormData } from '@/app/board/_types';

export const CategorySchema: ZodType<CategoryFormData> = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
});

export const TodoSchema: ZodType<TodoFormData> = z.object({
  title: z.string().min(1, {
    message: 'Title is required',
  }),
  category: z.string(),
  description: z.string().min(1, {
    message: 'Description is required',
  }),
  expiryDate: z.date({
    required_error: 'Expiry date is required',
    invalid_type_error: 'Expiry date is required',
  }),
});

// For Todo Edit
export const TodoTitleSchema: ZodType<{ title: string }> = z.object({
  title: z
    .string({
      required_error: 'Title is required',
      invalid_type_error: 'Title is required',
    })
    .min(3, {
      message: 'Title is too short.',
    }),
});

export const ExpiryDateSchema: ZodType<{ expiryDate: Date }> = z.object({
  expiryDate: z.date(),
});
