'use client';

import React from 'react';
import ExpiryDateBadge from '@/app/board/_components/ExpiryDateBadge';
import { TodoItemProps } from '@/app/board/_types';

const TodoItem = ({ todo, handleTodoEditDialogToggle }: TodoItemProps) => {
  const { id, title, daysRemaining } = todo;
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text', `${id}`);
  };

  return (
    <>
      <div
        role="button"
        draggable
        onDragStart={handleDragStart}
        onClick={() => handleTodoEditDialogToggle(true, todo)}
        className="flex flex-col items-start truncate rounded-lg border-2 border-transparent bg-white px-3 py-2 text-sm shadow-md hover:border-black">
        {title}
        {daysRemaining <= 2 && <ExpiryDateBadge daysRemaining={daysRemaining} />}
      </div>
    </>
  );
};

export default TodoItem;
