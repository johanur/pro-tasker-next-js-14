import * as z from 'zod';
import { ZodType } from 'zod';
import { TodoFormData } from '@/app/board/_types/todo';

export const TodoSchema:  ZodType<TodoFormData> = z.object({
  title: z.string({
    required_error: "Title is required",
    invalid_type_error: "Title is required",
  }).min(3, {
    message: "Title is too short."
  }),
  description: z.string({
    required_error: "Description is required",
    invalid_type_error: "Description is required",
  }),
  expiryDate: z.date({
    required_error: "Expiry date is required",
    invalid_type_error: "Expiry date is required",
  })
})
