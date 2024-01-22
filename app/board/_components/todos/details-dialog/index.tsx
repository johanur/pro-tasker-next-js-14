import { Dialog, DialogContent } from '@/components/ui/dialog';
import Header from './Header';
import Description from './Description';
import CategorySelect from './CategorySelect';
import ExpiryDatepicker from '@/app/board/_components/todos/details-dialog/ExpiryDatepicker';
import { useEffect, useRef, useState } from 'react';
import { DescriptionRef, Todo } from '@/app/board/_types';
import { getDaysRemaining } from '@/app/board/_utils';

const TodoDetails = ({ isOpen, onToggle, todo, categoryTitle }: any) => {
  const [todoDetails, setTodoDetails] = useState(todo);
  const descriptionRef = useRef<DescriptionRef>();

  useEffect(() => {
    setTodoDetails(todo);
  }, [todo]);

  const handleTodoUpdate = (updatedTodo: Todo) => {
    const todoDetails = {
      ...updatedTodo,
      daysRemaining: getDaysRemaining(updatedTodo.expire_date),
    };
    setTodoDetails(todoDetails);
  };

  const handleCloseDialog = () => {
    descriptionRef.current?.draftDescription();
    onToggle(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-xl gap-4" onOpenAutoFocus={e => e.preventDefault()}>
          {todo && <Header todo={todoDetails} handleTodoUpdate={handleTodoUpdate} />}
          {todo && <CategorySelect todo={todoDetails} handleTodoUpdate={handleTodoUpdate} />}
          {todo && <ExpiryDatepicker todo={todoDetails} handleTodoUpdate={handleTodoUpdate} />}
          {todo && <Description ref={descriptionRef} todo={todoDetails} handleTodoUpdate={handleTodoUpdate} />}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TodoDetails;
