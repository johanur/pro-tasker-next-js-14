import { useEffect, useRef, useState } from 'react';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { getDaysRemaining } from '@/app/board/_utils';
import { DescriptionRef, ExtendedTodo, Todo, TodoDetailsProps } from '@/app/board/_types';
import Header from './Header';
import Description from './Description';
import CategorySelect from './CategorySelect';
import ExpiryDatepicker from '@/app/board/_components/todos/details-dialog/ExpiryDatepicker';

const TodoDetails = ({ isOpen, onToggle, todo }: TodoDetailsProps) => {
  const [todoDetails, setTodoDetails] = useState(todo);
  const descriptionRef = useRef<DescriptionRef>();

  useEffect(() => {
    setTodoDetails(todo);
  }, [todo]);

  const handleTodoUpdate = (updatedTodo: Todo) => {
    const todoDetails: ExtendedTodo = {
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
          <Header todo={todoDetails} handleTodoUpdate={handleTodoUpdate} />
          <CategorySelect todo={todoDetails} handleTodoUpdate={handleTodoUpdate} />
          <ExpiryDatepicker todo={todoDetails} handleTodoUpdate={handleTodoUpdate} />
          <Description ref={descriptionRef} todo={todoDetails} handleTodoUpdate={handleTodoUpdate} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TodoDetails;
