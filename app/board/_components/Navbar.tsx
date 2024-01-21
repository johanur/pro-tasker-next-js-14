import Logout from '@/app/board/_components/Logout';

const Navbar = () => {
  return (
    <nav className="fixed top-0 z-50 flex h-14 w-full items-center justify-between border-b bg-white px-4 shadow-sm">
      <h1>Pro Tasker</h1>
      <Logout />
    </nav>
  );
};

export default Navbar;
