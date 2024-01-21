import { redirect } from 'next/navigation';
import readUserSession from '@/lib/actions/user-session.action';
import CategoryContainer from './_components/category/CategoryContainer';
import { getCategories } from '@/app/board/_actions/category.actions';

const Todo = async () => {
  const { data } = await readUserSession();
  if (!data.session) {
    return redirect('/login');
  }
  const { data: categories } = await getCategories();

  return (
    <div className="h-full overflow-x-auto p-4">
      <CategoryContainer categories={categories} />
    </div>
  );
};

export default Todo;
