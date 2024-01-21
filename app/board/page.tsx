import { redirect } from 'next/navigation';
import { getCategoriesWithTodos, updateTodoCategoryId } from '@/app/board/_actions';
import readUserSession from '@/lib/actions/user-session.action';
import CategoryContainer from './_components/category/CategoryContainer';
import { toast } from '@/components/ui/use-toast';
import { revalidatePath } from 'next/cache';

const Todo = async () => {
  const { data: userData } = await readUserSession();
  if (!userData.session) {
    return redirect('/login');
  }

  const { data } = await getCategoriesWithTodos();

  if (!data) {
    return <h1>Something went wrong!</h1>
  }

  const updateTodoCategory = async(todoId: string, categoryId: string) => {
    'use server';
    const response = await updateTodoCategoryId(todoId, categoryId);

    if (response.error) {
      // TODO Find a way to show toast from client component after getting the response in server component
      // toast({
      //   duration: 4000,
      //   variant: "destructive",
      //   title: "Oops! Something went wrong",
      //   description: "There was an error while updating the category of",
      // })
      revalidatePath('/board');
    } else {
      // toast({
      //   duration: 4000,
      //   title: "Moved Successfully",
      //   description: "The item has been successfully moved to the new category",
      // })
    }

  }

  return (
    <div className="h-full overflow-x-auto p-4">
      <CategoryContainer data={data} updateTodoCategory={updateTodoCategory} updateToDo />
    </div>
  );
};

export default Todo;
