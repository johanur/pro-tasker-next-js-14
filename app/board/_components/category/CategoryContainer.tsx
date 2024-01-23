'use client';

import { useEffect, useState } from 'react';

import { BoardContext } from '@/app/board/_contexts';
import { toast } from '@/components/ui/use-toast';
import { createActivityLog, updateTodoDetails } from '@/app/board/_actions';
import { Category, CategoryContainerProps, Todo } from '@/app/board/_types';

import CategoryForm from '../../_components/category/CategoryForm';
import CategoryItem from '../../_components/category/CategoryItem';

import { getUpdatedCategory } from '@/app/board/_utils';

const CategoryContainer = ({ data }: CategoryContainerProps) => {
  const [categoriesWithTodos, setCategoriesWithTodos] = useState(data);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    setCategoriesWithTodos(data);

    // For select menu of create/edit form
    const categoriesWithoutTodos = data.map(({ todos, ...rest }) => rest);
    setCategories(categoriesWithoutTodos);
  }, [data]);

  const handleUpdateList = (todoId: string, targetCategoryId: string) => {
    const updatedCategoriesWithTodos = getUpdatedCategory(categoriesWithTodos, todoId, targetCategoryId);
    if (!updatedCategoriesWithTodos) {
      return;
    }
    setCategoriesWithTodos(updatedCategoriesWithTodos);

    updateTodoCategory(todoId, targetCategoryId)
      .then(response => {
        if (response.error) {
          toast({
            variant: 'destructive',
            title: 'Failed to update category',
            description: 'There was an error while updating the category. Please try again',
          });
          return;
        }

        toast({
          duration: 4000,
          title: 'Category updated successfully',
        });
      })
      .catch(() => {
        toast({
          variant: 'destructive',
          title: 'Something went wrong!',
        });
      });
  };

  const updateTodoCategory = async (todoId: string, categoryId: string) => {
    const payload: Pick<Todo, 'id' | 'category_id'> = {
      id: todoId,
      category_id: categoryId,
    };

    const category = categories.find(category => category.id === categoryId);

    const updatedTodoDetails =  await updateTodoDetails(payload);

    if (category) {
      await createActivityLog(todoId, category.title);
    }
    return updatedTodoDetails;
  };

  return (
    <BoardContext.Provider
      value={{
        categories: categories,
      }}>
      <ol className="flex h-full gap-x-3">
        {categoriesWithTodos.map(category => (
          <CategoryItem key={category.id} categoryWithTodos={category} handleUpdateList={handleUpdateList} />
        ))}
        <CategoryForm />
      </ol>
    </BoardContext.Provider>
  );
};

export default CategoryContainer;
