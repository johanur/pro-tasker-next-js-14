import { createContext } from 'react';
import { Category } from '@/app/board/_types';

export const BoardContext = createContext<{
  categories: Category[];
}>({
  categories: [],
});

export const DRAFT_DESCRIPTION_STORAGE_KEY = 'draft_description';
