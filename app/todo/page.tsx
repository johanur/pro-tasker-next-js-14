import { redirect } from 'next/navigation';
import readUserSession from '../../lib/actions/user-session.action';
import Logout from '@/app/todo/components/Logout';

const Todo = async () => {
  const { data } = await readUserSession();
  if (!data.session) {
    return redirect('/auth/login');
  }
  return (
    <>
      <h1>Todos works</h1>
      <Logout />
    </>
  );
};

export default Todo;
