import { redirect } from 'next/navigation';
import readUserSession from '@/lib/actions/user-session.action';
import CategoryContainer from './_components/category/CategoryContainer';

const Todo = async () => {
  const { data } = await readUserSession();
  if (!data.session) {
    return redirect('/login');
  }
  return (
    <div className="h-full overflow-x-auto p-4">
      <CategoryContainer />
    </div>
  );
};

export default Todo;
