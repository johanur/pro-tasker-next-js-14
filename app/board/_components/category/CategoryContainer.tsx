'use client';

import CategoryForm from '../../_components/category/CategoryForm';
import CategoryItem from '../../_components/category/CategoryItem';
import { CategoryWithTodos, UpdateTodoCategoryFunction } from '@/app/board/_types';
import { useEffect, useState } from 'react';

interface Props {
  data: CategoryWithTodos[];
  updateTodoCategory: UpdateTodoCategoryFunction;
}

const CategoryContainer = ({ data, updateTodoCategory }: Props) => {
  const [categoriesWithTodos, setCategoriesWithTodos] = useState(data);

  useEffect(() => {
    setCategoriesWithTodos(data);
  }, [data]);

  const handleUpdateList = (todoId: string, categoryId: string) => {
    const sourceCategory = categoriesWithTodos.find(category => category.todos.find(todo => todo.id === todoId));
    if (!sourceCategory) {
      return;
    }

    const todoToMove = sourceCategory.todos.find(todo => todo.id === todoId);

    if(!todoToMove) {
      return;
    }

    const updateSourceCategoryTodos = sourceCategory.todos.filter(todo => todo.id !== todoId);

    const targetCategory = categoriesWithTodos.find(category => category.id === categoryId);

    if(!targetCategory) {
      return;
    }

    const updatedTodoToMove = {...todoToMove, category_id: categoryId};
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
  }

  return (
    <ol className="flex h-full gap-x-3">
      {categoriesWithTodos.map((category: any) => {
        return <CategoryItem key={category.id} categoryWithTodos={category} handleUpdateList={handleUpdateList} />;
      })}
      <CategoryForm />
      <div className="w-1 flex-shrink-0" />
    </ol>
  );
};

export default CategoryContainer;
