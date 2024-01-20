import Navbar from './_components/Navbar';
import BackgroundImage from '@/app/todo/_components/BackgroundImage';

const TodoLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fixed h-full w-full">
      <BackgroundImage />
      <Navbar />
      <main className="relative h-full pt-16">{children}</main>
    </div>
  );
};

export default TodoLayout;
