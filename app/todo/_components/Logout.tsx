import { redirect } from 'next/navigation';
import createSupabaseServerClient from '@/lib/supabase/server';

const Logout = () => {
  const logout = async () => {
    'use server';
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
    redirect('/login');
  };
  return (
    <form action={logout}>
      <button className="font-medium text-blue-500">Logout</button>
    </form>
  );
};

export default Logout;
