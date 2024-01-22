import { createContext } from 'react';
import { Category } from '@/app/board/_types';

export const BoardContext = createContext<{
  categories: Category[];
}>({
  categories: [],
});

