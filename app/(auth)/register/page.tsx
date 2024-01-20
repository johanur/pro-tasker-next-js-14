import RegisterForm from '@/app/(auth)/components/RegisterForm';
import readUserSession from '@/lib/actions/user-session.action';
import { redirect } from 'next/navigation';

const Register = async () => {
  const { data } = await readUserSession();
  if (data.session) {
    return redirect('/todo');
  }
  return <RegisterForm />;
};

export default Register;
