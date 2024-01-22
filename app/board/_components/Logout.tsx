import { redirect } from 'next/navigation';
import createSupabaseServerClient from '@/lib/supabase/server';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

const Logout = () => {
  const logout = async () => {
    'use server';
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
    redirect('/login');
  };
  return (
    <form action={logout}>
      <Button variant="link" className="font-medium text-blue-500 text-md p-0 hover:no-underline">
        <LogOut className="mr-2" size={20} />
        Logout
      </Button>
    </form>
  );
};

export default Logout;
