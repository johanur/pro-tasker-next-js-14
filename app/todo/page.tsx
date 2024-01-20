import { redirect } from 'next/navigation';
import readUserSession from '../../lib/actions/user-session.action';

const Todo = async () => {
  const { data } = await readUserSession();
  if (!data.session) {
    return redirect('/auth/login');
  }
  return <h1>Todos works</h1>;
};

export default Todo;
