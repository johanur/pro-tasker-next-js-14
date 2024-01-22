import { DayRemaining } from '@/app/board/_enums';
import { z } from 'zod';
import { CategorySchema } from '@/app/board/_schema';

export type AddCategorySchema = z.infer<typeof CategorySchema>;

export interface CategoryFormData {
  title: string;
}

export interface TodoFormData {
  title: string;
  category: string;
  description: string;
  expiryDate: Date;
}

export interface ExpiryDateBadgeProps {
  daysRemaining: DayRemaining;
}

export interface Category {
  id: string;
  title: string;
  created_at: string;
  update_at?: string;
  user_id: string;
}

export interface Todo {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  category_id: string;
  description: string;
  expire_date: string;
}

export type CategoryWithTodos = Category & { todos: Todo[] };

export interface DescriptionRef {
  draftDescription(): void;
}

export interface CategoryContainerProps {
  data: CategoryWithTodos[];
}

export interface CategoryItemProps {
  categoryWithTodos: CategoryWithTodos;
  handleUpdateList: (todoId: string, categoryId: string) => void;
}
