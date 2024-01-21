import { redirect } from 'next/navigation';
import readUserSession from '@/lib/actions/user-session.action';
import CategoryContainer from './_components/category/CategoryContainer';
import { getCategoriesWithTodos } from '@/app/board/_actions/board.actions';

const Todo = async () => {
  const { data: userData } = await readUserSession();
  if (!userData.session) {
    return redirect('/login');
  }
  const { data: categoriesWithTodos } = await getCategoriesWithTodos();
  console.log('Log Here categories:', categoriesWithTodos);

  return (
    <div className="h-full overflow-x-auto p-4">
      <CategoryContainer categoriesWithTodos={categoriesWithTodos} />
    </div>
  );
};

export default Todo;
