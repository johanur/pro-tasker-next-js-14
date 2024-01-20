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
      <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">Logout</button>
    </form>
  );
};

export default Logout;
