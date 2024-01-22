'use client';

import CategoryForm from '../../_components/category/CategoryForm';
import CategoryItem from '../../_components/category/CategoryItem';
import { Category, CategoryWithTodos, UpdateTodoCategoryFunction } from '@/app/board/_types';
import { useEffect, useState } from 'react';
import { BoardContext } from '@/app/board/_contexts';

interface Props {
  data: CategoryWithTodos[];
  updateTodoCategory: UpdateTodoCategoryFunction;
}

const CategoryContainer = ({ data, updateTodoCategory }: Props) => {
  const [categoriesWithTodos, setCategoriesWithTodos] = useState(data);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    setCategoriesWithTodos(data);

    const categoriesWithoutTodos = data.map(({ todos, ...rest }) => rest);
    setCategories(categoriesWithoutTodos);
  }, [data]);

  const handleUpdateList = (todoId: string, categoryId: string) => {
    const sourceCategory = categoriesWithTodos.find(category => category.todos.find(todo => todo.id === todoId));
    if (!sourceCategory) {
      return;
    }

    if (sourceCategory.id === categoryId) {
      return;
    }

    const todoToMove = sourceCategory.todos.find(todo => todo.id === todoId);

    if (!todoToMove) {
      return;
    }

    const updateSourceCategoryTodos = sourceCategory.todos.filter(todo => todo.id !== todoId);

    const targetCategory = categoriesWithTodos.find(category => category.id === categoryId);

    if (!targetCategory) {
      return;
    }

    const updatedTodoToMove = { ...todoToMove, category_id: categoryId };
    const updatedTargetTodos = [...targetCategory.todos, updatedTodoToMove];

    const updatedCategoriesWithTodos = categoriesWithTodos.map(category => {
      if (category.id === sourceCategory.id) {
        return { ...category, todos: updateSourceCategoryTodos };
      } else if (category.id === targetCategory.id) {
        return { ...category, todos: updatedTargetTodos };
      }
      return category;
    });

    setCategoriesWithTodos(updatedCategoriesWithTodos);
    updateTodoCategory(todoId, categoryId);
  };

  return (
    <BoardContext.Provider
      value={{
        categories: categories,
      }}>
      <ol className="flex h-full gap-x-3">
        {categoriesWithTodos.map((category: any) => {
          return <CategoryItem key={category.id} categoryWithTodos={category} handleUpdateList={handleUpdateList} />;
        })}
        <CategoryForm />
        <div className="w-1 flex-shrink-0" />
      </ol>
    </BoardContext.Provider>
  );
};

export default CategoryContainer;
