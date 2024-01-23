import { differenceInCalendarDays, parseISO } from 'date-fns';
import { CategoryWithTodos } from '@/app/board/_types';

export const getDaysRemaining = (expiryDate: string): number => {
  const parsedExpiryDate = parseISO(expiryDate);
  const currentDate = new Date();
  const differenceInDays = differenceInCalendarDays(parsedExpiryDate, currentDate);
  return differenceInDays < 0 ? -1 : differenceInDays;
};

export const getUpdatedCategory = (
  categoriesWithTodos: CategoryWithTodos[],
  todoId: string,
  targetCategoryId: string
): CategoryWithTodos[] | undefined => {
  const sourceCategory = categoriesWithTodos.find(category => category.todos.find(todo => todo.id === todoId));
  if (!sourceCategory) {
    return;
  }

  if (sourceCategory.id === targetCategoryId) {
    return;
  }

  const todoToMove = sourceCategory.todos.find(todo => todo.id === todoId);

  if (!todoToMove) {
    return;
  }

  const updateSourceCategoryTodos = sourceCategory.todos.filter(todo => todo.id !== todoId);

  const targetCategory = categoriesWithTodos.find(category => category.id === targetCategoryId);

  if (!targetCategory) {
    return;
  }

  const updatedTodoToMove = { ...todoToMove, category_id: targetCategoryId };
  const updatedTargetTodos = [...targetCategory.todos, updatedTodoToMove];

  return categoriesWithTodos.map(category => {
    if (category.id === sourceCategory.id) {
      return { ...category, todos: updateSourceCategoryTodos };
    } else if (category.id === targetCategory.id) {
      return { ...category, todos: updatedTargetTodos };
    }
    return category;
  });
};
