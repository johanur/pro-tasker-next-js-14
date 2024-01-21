'use server';
import { unstable_noStore as noStore, revalidatePath } from 'next/cache';
import createSupabaseServerClient from '@/lib/supabase/server';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { CategoryWithTodos } from '@/app/board/_types';

export async function getCategoriesWithTodos(): Promise<PostgrestSingleResponse<CategoryWithTodos[]>> {
  noStore();
  const supabase = await createSupabaseServerClient();
  return supabase.from("category").select('*, todos:todo(*)');
}

export async function addCategory(title: string): Promise<PostgrestSingleResponse<string>> {
  const supabase = await createSupabaseServerClient();
  const result = await supabase.from("category").insert({ title }).single();
  revalidatePath("/board");
  return result;
}

export async function addTodo(todo: { title: string, description: string, expiryDate: string, categoryId: string }): Promise<string> {
  const supabase = await createSupabaseServerClient();
  const payload = {
    title: todo.title,
    description: todo.description,
    expire_date: todo.expiryDate,
    category_id: todo.categoryId
  }
  const result = await supabase.from("todo").insert(payload);
  revalidatePath("/board");
  return JSON.stringify(result);
}
