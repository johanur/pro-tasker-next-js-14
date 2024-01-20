import readUserSession from '../../lib/actions/user-session.action';
import { redirect } from 'next/navigation';

const Auth = async () => {
  const { data } = await readUserSession();
  data.session ? redirect('/todo') : redirect('/auth/login');
};

export default Auth;
