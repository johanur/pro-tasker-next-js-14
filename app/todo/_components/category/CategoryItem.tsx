'use client';

import TodoItem from '@/app/todo/_components/todos/TodoItem';
import TodoCreate from '@/app/todo/_components/todos/TodoCreate';
import { useState } from 'react';

interface Props {
  category: any;
  index: number;
}
const CategoryItem = ({ category, index }: Props) => {
  const [isTodoCreateDialogOpen, setTodoCreateDialogOpen] = useState(false);

  const todos = [
    {
      id: 123,
      title: 'Test',
      order: 2,
    },
    {
      id: 234,
      title: 'Test 2',
      order: 1,
    },
    {
      id: 456,
      title: 'Test 3',
      order: 3,
    },
  ];

  const [isDragging, setIsDragging] = useState(false)

  const handleDragging = (dragging: boolean) => setIsDragging(dragging)

  const handleTodoCreateDialogToggle = (isOpen: boolean) => {
    setTodoCreateDialogOpen(isOpen);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log('Log Here categgory: ',category);
    handleDragging(false)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault()

  return (
    <>
      <TodoCreate />

      <li className="h-full w-[272px] shrink-0 select-none">
        <div className="w-full rounded-md bg-[#f1f2f4] pb-2 shadow-md">
          <div className="items-start- flex justify-between gap-x-2 px-2 pt-2 text-sm font-semibold">
            <div className="h-7 w-full border-transparent px-2.5 py-1 text-sm font-medium">{category.title}</div>
          </div>

          <div onDrop={handleDrop}
               onDragOver={handleDragOver}>
            <ol className="mx-1 mt-2 flex flex-col gap-y-2 px-1 py-0.5" >
              {todos.map(todo => (
                <TodoItem todo={todo} key={todo.id} handleDragging={handleDragging}
                />
              ))}
            </ol>
          </div>

          <div className="px-2 pt-2">
            <button
              className="flex h-auto w-full justify-start px-2 py-1.5 text-sm text-slate-500"
              onClick={() => handleTodoCreateDialogToggle(true)}>
              + Add a card
            </button>
          </div>
        </div>
      </li>

      <TodoCreate isOpen={isTodoCreateDialogOpen} onToggle={handleTodoCreateDialogToggle} />
    </>
  );
};

export default CategoryItem;