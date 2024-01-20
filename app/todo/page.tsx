import { redirect } from 'next/navigation';
import readUserSession from '@/lib/actions/user-session.action';
import Logout from './_components/Logout';

const Todo = async () => {
  const { data } = await readUserSession();
  if (!data.session) {
    return redirect('/login');
  }
  return (
    <>
      <h1>Todos works</h1>
      <Logout />
    </>
  );
};

export default Todo;
