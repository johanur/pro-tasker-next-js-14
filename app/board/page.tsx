import { redirect } from 'next/navigation';
import { getCategoriesWithTodos } from '@/app/board/_actions';
import readUserSession from '@/lib/actions/user-session.action';
import CategoryContainer from './_components/category/CategoryContainer';

const Todo = async () => {
  const { data: userData } = await readUserSession();

  if (!userData.session) {
    return redirect('/login');
  }

  const { data } = await getCategoriesWithTodos();
  if (!data) {
    return <h1>Something went wrong!</h1>;
  }

  return (
    <div className="h-full overflow-x-auto p-4">
      <CategoryContainer data={data} />
    </div>
  );
};

export default Todo;
