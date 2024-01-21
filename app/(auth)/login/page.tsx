import { redirect } from 'next/navigation';
import readUserSession from '@/lib/actions/user-session.action';
import LoginForm from '../_components/LoginForm';

const Login = async () => {
  const { data } = await readUserSession();
  if (data.session) {
    return redirect('/board');
  }
  return <LoginForm />;
};

export default Login;
