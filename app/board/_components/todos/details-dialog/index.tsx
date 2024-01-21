import { Dialog, DialogContent } from '@/components/ui/dialog';
import Header from './Header';
import Description from './Description';
import CategorySelect from './CategorySelect';
import ExpiryDatepicker from '@/app/board/_components/todos/details-dialog/ExpiryDatepicket';

const TodoDetails = ({ isOpen, onToggle, todo }: any) => {
  const handleCloseDialog = () => {
    onToggle(false);
  };

  return (
    <>
      <Dialog  open={isOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-xl gap-4" onOpenAutoFocus={e => e.preventDefault()}>
          {todo && (<Header todo={todo} />)}
          {todo && (<CategorySelect todo={todo} />)}
          {todo && (<ExpiryDatepicker todo={todo} />)}
          {todo && (<Description todo={todo} />)}

          {/*<div className="grid grid-cols-1 md:grid-cols-8 md:gap-6">*/}
          {/*  <div className="col-span-4">*/}
          {/*    <div className="w-full space-y-6">*/}
          {/*      {todo && (<CategorySelect todo={todo} />)}*/}

          {/*    </div>*/}
          {/*  </div>*/}
          {/*  <div className="col-span-4">*/}
          {/*    <div className="w-full">*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TodoDetails;
