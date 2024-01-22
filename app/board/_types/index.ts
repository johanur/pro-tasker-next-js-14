import { DayRemaining } from '@/app/board/_enums';
import { z } from 'zod';
import { CategorySchema, TodoSchema } from '@/app/board/_schema';

export type AddCategorySchema = z.infer<typeof CategorySchema>;
export type AddTodoSchema = z.infer<typeof TodoSchema>;

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

export interface ExtendedTodo extends Todo {
  daysRemaining: number;
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

export interface TodoItemProps {
  todo: ExtendedTodo;
  handleTodoEditDialogToggle: (isOpen: boolean, todo: ExtendedTodo) => void;
}

export interface TodoCreateProps {
  isOpen: boolean;
  categoryId: string;
  onToggle: (isOpen: boolean) => void;
}
