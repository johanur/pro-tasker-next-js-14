import { Dialog, DialogContent } from '@/components/ui/dialog';
import Header from './Header';
import Description from './Description';
import CategorySelect from './CategorySelect';
import ExpiryDatepicker from '@/app/board/_components/todos/details-dialog/ExpiryDatepicket';

const TodoDetails = ({ isOpen, onToggle, todo, categoryTitle, categories }: any) => {
  const handleCloseDialog = () => {
    onToggle(false);
  };

  return (
    <>
      <Dialog  open={isOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-xl gap-4" onOpenAutoFocus={e => e.preventDefault()}>
          {todo && (<Header todo={todo} />)}
          {todo && (<CategorySelect todo={todo} categoryTitle={categoryTitle} />)}
          {todo && (<ExpiryDatepicker todo={todo} />)}
          {todo && (<Description todo={todo} />)}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TodoDetails;
