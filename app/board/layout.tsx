import Navbar from './_components/Navbar';

const TodoLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fixed h-full w-full" style={{ backgroundColor: 'hsl(218,20.4%,34.4%)' }}>
      <Navbar />
      <main className="relative h-full pt-16">{children}</main>
    </div>
  );
};

export default TodoLayout;
