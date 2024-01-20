import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from '@/components/ui/dialog';
const TodoCreate = ({ isOpen, onToggle }: any) => {
  const handleCloseDialog = () => {
    onToggle(false);
  };
  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleCloseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account and remove your data from our
              servers.
            </DialogDescription>

            <DialogFooter className="sm:justify-start">

            </DialogFooter>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TodoCreate;
