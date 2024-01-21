const TodoItem = ({ todo, handleDragging }: any) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text', `${todo.id}`)
    handleDragging(true)
  }
  const handleDragEnd = () => handleDragging(false)
  return (
    <div
      role="button"
      draggable
      onDragStart={handleDragStart}
      className="truncate rounded-md border-2 border-transparent bg-white px-3 py-2 text-sm shadow-sm hover:border-black">
      {todo.title}
    </div>
  );
};

export default TodoItem;
