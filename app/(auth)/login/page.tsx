import LoginForm from '@/app/(auth)/components/LoginForm';
import readUserSession from '@/lib/actions/user-session.action';
import { redirect } from 'next/navigation';

const Login = async () => {
  const { data } = await readUserSession();
  if (data.session) {
    return redirect('/todo');
  }
  return <LoginForm />;
};

export default Login;
