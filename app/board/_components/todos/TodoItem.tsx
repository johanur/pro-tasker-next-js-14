'use client';
import ExpiryDateBadge from '@/app/board/_components/ExpiryDateBadge';

const TodoItem = ({ todo, daysRemaining, handleTodoEditDialogToggle }: any) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text', `${todo.id}`);
  };

  return (
    <>
      <div
        role="button"
        draggable
        onDragStart={handleDragStart}
        onClick={() => handleTodoEditDialogToggle(true, todo)}
        className="flex flex-col items-start truncate rounded-lg border-2 border-transparent bg-white px-3 py-2 text-sm shadow-md hover:border-black">
        {todo.title}
        {daysRemaining <= 2 && <ExpiryDateBadge daysRemaining={daysRemaining} />}
      </div>
    </>
  );
};

export default TodoItem;
