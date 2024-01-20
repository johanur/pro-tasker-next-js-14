import { redirect } from 'next/navigation';
import readUserSession from '@/lib/actions/user-session.action';
import Logout from './_components/Logout';

const Todo = async () => {
  const { data } = await readUserSession();
  if (!data.session) {
    return redirect('/login');
  }
  return (
    <div className="h-full overflow-x-auto p-4">
      <h1 className="text-white">Todos works</h1>
    </div>
  );
};

export default Todo;
