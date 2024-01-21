import { redirect } from 'next/navigation';
import readUserSession from '@/lib/actions/user-session.action';
import RegisterForm from '../_components/RegisterForm';

const Register = async () => {
  const { data } = await readUserSession();
  if (data.session) {
    return redirect('/board');
  }
  return <RegisterForm />;
};

export default Register;
