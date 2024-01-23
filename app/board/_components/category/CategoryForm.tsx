'use client';

import { useEffect, useRef, useState, ElementRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { CategorySchema } from '@/app/board/_schema';
import { AddCategorySchema, CategoryFormData } from '@/app/board/_types';
import { toast } from '@/components/ui/use-toast';
import { addCategory } from '@/app/board/_actions';

import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const CategoryForm = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categoryFormRef = useRef<ElementRef<'form'>>(null);

  const form = useForm<AddCategorySchema>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      title: ''
    }
  });

  useEffect(() => {
    document.addEventListener('keydown', handleEscapeKey);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSubmitting]);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => form.setFocus('title'));
  };

  const disableEditing = () => {
    setIsEditing(false);
    form.clearErrors();
  };

  const handleEscapeKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && !isSubmitting) {
      disableEditing();
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (categoryFormRef.current && !categoryFormRef.current.contains(event.target as Node) && !isSubmitting) {
      disableEditing();
    }
  };

  const submitCategory = async (data: CategoryFormData) => {
    setIsSubmitting(true);

    try {
      const { error } = await addCategory(data.title);

      if (error) {
        toast({
          variant: 'destructive',
          title: 'Failed to create Category',
          description: 'There was an error while saving the new category. Please try again later.',
        });
        return;
      }

      toast({
        title: 'Category Added Successfully',
        description: 'The new category has been added successfully!',
      });
      disableEditing();
      form.reset();
    } catch {
      toast({
        variant: 'destructive',
        title: 'Something went wrong!',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isEditing) {
    return (
      <li className="h-full w-[272px] shrink-0 select-none">
        <Form {...form}>
          <form
            className="w-full space-y-3 rounded-md bg-white p-3 shadow-md"
            onSubmit={form.handleSubmit(submitCategory)}
            ref={categoryFormRef}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input disabled={isSubmitting} className="h-8"  {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-1">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="me-1 h-7 rounded-md bg-indigo-600 px-2 py-1 text-sm font-medium text-white hover:bg-indigo-500">
                Add Category
              </Button>
              <Button
                type="button"
                disabled={isSubmitting}
                className="me-1 h-7 rounded-md bg-gray-600 px-2 py-1 text-sm font-medium text-white hover:bg-gray-900"
                onClick={disableEditing}>
                Close
              </Button>
            </div>
          </form>
        </Form>
      </li>
    );
  }

  return (
    <li className="h-full w-[272px] shrink-0 select-none">
      <Button
        onClick={enableEditing}
        variant="ghost"
        className="flex h-11 w-full items-center justify-start rounded-xl bg-[#ffffff3d] p-3 text-sm font-medium text-white transition hover:bg-[#A6C5E229] hover:text-white">
        <Plus className="mr-2 h-4 w-4" />
        Add category
      </Button>
    </li>
  );
};

export default CategoryForm;
