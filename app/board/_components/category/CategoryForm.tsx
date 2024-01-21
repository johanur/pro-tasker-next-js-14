'use client';

import { z } from 'zod';
import { ElementRef, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CategorySchema } from '@/app/board/_schema/category.schema';
import { CategoryFormData } from '@/app/board/_types/category';
import { addCategory } from '@/app/board/_actions/board.actions';
import { toast } from '@/components/ui/use-toast';

type Inputs = z.infer<typeof CategorySchema>;

const CategoryForm = () => {
  const [isEditing, setIsEditing] = useState(false);
  const categoryFormRef = useRef<ElementRef<'form'>>(null);

  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
    setFocus,
    clearErrors,
  } = useForm<Inputs>({
    resolver: zodResolver(CategorySchema),
  });

  useEffect(() => {
    document.addEventListener('keydown', handleEscapeKey);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      setFocus('title');
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
    clearErrors();
  };

  const handleEscapeKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      disableEditing();
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (categoryFormRef.current && !categoryFormRef.current.contains(event.target as Node)) {
      disableEditing();
    }
  };

  const submitCategory = async (data: CategoryFormData) => {
    const result = await addCategory(data.title);
    const { error } = JSON.parse(result);
    console.log('Log Here Result: ', result);

    if (error?.message) {
      toast({
        duration: 4000,
        variant: "destructive",
        title: "Failed to create Category",
        description: "There was an error while saving the new category. Please try again later.",
      })
    } else {
      toast({
        duration: 4000,
        title: "Category Added Successfully",
        description: "The new category has been added successfully!",
      })
      disableEditing();
      resetForm();
    }
  };

  if (isEditing) {
    return (
      <li className="h-full w-[272px] shrink-0 select-none">
        <form
          className="w-full space-y-3 rounded-md bg-white p-3 shadow-md"
          onSubmit={handleSubmit(submitCategory)}
          ref={categoryFormRef}>
          <div>
            <input
              id="title"
              type="text"
              className="hover:border-input focus:border-input h-8 w-full rounded-md border-2 px-2 py-1 text-sm font-medium transition"
              placeholder="Enter category title..."
              {...register('title')}
            />
            {errors?.title?.message && <p className="pt-2 text-sm text-red-400">{errors.title.message}</p>}
          </div>

          <div className="flex items-center gap-x-1">
            <button
              type="submit"
              className="me-1 rounded-lg bg-indigo-600 px-2 py-1 text-sm font-medium text-white hover:bg-indigo-500">
              Add Category
            </button>
            <button
              type="button"
              className="me-1 rounded-lg bg-gray-600 px-2 py-1 text-sm font-medium text-white hover:bg-gray-900"
              onClick={disableEditing}>
              Close
            </button>
          </div>
        </form>
      </li>
    );
  }

  return (
    <li className="h-full w-[272px] shrink-0 select-none">
      <button
        onClick={enableEditing}
        className="flex w-full items-center rounded-md bg-white/95 p-3 text-sm font-medium transition hover:bg-white/85">
        Add category
      </button>
    </li>
  );
};

export default CategoryForm;
