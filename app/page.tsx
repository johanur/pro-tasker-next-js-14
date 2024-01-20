import Image from 'next/image';
import readUserSession from '@/lib/actions/user-session.action';
import { redirect } from 'next/navigation';

export default async function Home() {
  const { data } = await readUserSession();
  data.session ? redirect('/todo') : redirect('/auth/login');

  return <h1>Pro Tasker</h1>;
}
