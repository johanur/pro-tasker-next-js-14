'use server';
import { unstable_noStore as noStore, revalidatePath } from 'next/cache';
import createSupabaseServerClient from '@/lib/supabase/server';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { CategoryWithTodos, Todo, TodoFormData } from '@/app/board/_types';
import { format } from 'date-fns';

export async function getCategoriesWithTodos(): Promise<PostgrestSingleResponse<CategoryWithTodos[]>> {
  noStore();
  const supabase = await createSupabaseServerClient();
  return supabase.from('category').select('*, todos:todo(*)');
}

export async function addCategory(title: string): Promise<PostgrestSingleResponse<void>> {
  const supabase = await createSupabaseServerClient();
  const result = await supabase.from('category').insert({ title }).single();
  revalidatePath('/board');
  return result;
}

export async function addTodo(todo: TodoFormData): Promise<PostgrestSingleResponse<void>> {
  const supabase = await createSupabaseServerClient();

  const payload = {
    title: todo.title,
    description: todo.description,
    expire_date: format(todo.expiryDate, 'yyyy-MM-dd'),
    category_id: todo.category,
  };
  const result = await supabase.from('todo').insert(payload).single();

  revalidatePath('/board');
  return result;
}

export async function updateTodoDetails(todo: Partial<Todo>): Promise<PostgrestSingleResponse<Todo>> {
  const supabase = await createSupabaseServerClient();
  const result = await supabase
    .from('todo')
    .update({ ...todo })
    .eq('id', todo.id)
    .select()
    .single();
  revalidatePath('/board');
  return result;
}
