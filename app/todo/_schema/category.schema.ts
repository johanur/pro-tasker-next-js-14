import { z, ZodType } from 'zod';
import { CategoryFormData } from '@/app/todo/_types/category';

export const CategorySchema: ZodType<CategoryFormData> = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
});
