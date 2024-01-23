'use client';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

import { signOut } from '@/app/board/_actions';
import { useRouter } from 'next/navigation';

const Logout = () => {
  const router = useRouter();

  const logout = async () => {
    toast({
      duration: 2000,
      title: 'Logging Out...'
    });

    try {
      await signOut();
      router.push('/login');
    } catch {
      toast({
        title: 'Something went wrong while logging out!'
      });
    }
  };
  return (
      <Button onClick={logout} variant="link" className="text-md p-0 font-medium text-blue-500 hover:no-underline">
        <LogOut className="mr-2" size={20} />
        Logout
      </Button>
  );
};

export default Logout;
