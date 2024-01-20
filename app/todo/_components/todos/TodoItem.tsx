const TodoItem = ({ title }: any) => {
  return (
    <div
      role="button"
      className="truncate rounded-md border-2 border-transparent bg-white px-3 py-2 text-sm shadow-sm hover:border-black">
      {title}
    </div>
  );
};

export default TodoItem;
