import { z } from 'zod';
import { DayRemaining } from '@/app/board/_enums';
import { CategorySchema, TodoSchema } from '@/app/board/_schema';

export type AddCategorySchema = z.infer<typeof CategorySchema>;
export type AddTodoSchema = z.infer<typeof TodoSchema>;
export type CategoryWithTodos = Category & { todos: Todo[] };

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

export interface TodoDetailsProps {
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
  todo: ExtendedTodo;
}

export interface TodoDetailsComponentsProps {
  todo: ExtendedTodo;
  handleTodoUpdate: (todo: Todo) => void;
}

export interface DescriptionRef {
  draftDescription(): void;
}

export interface ActivityLog {
  id: string;
  todo_id: string;
  category_title: string;
  created_at: Date;
  user_id: string;
}

export interface ActivityRef {
  fetchActivities(): void;
}

export interface ActivityProps {
 todoId: string;
}

export interface ActivityItemProps {
  title: string;
  createdAt: Date;
}
