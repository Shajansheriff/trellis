import { Navbar } from '@/components/navbar';
import { createFileRoute, Outlet } from '@tanstack/react-router';

function Layout() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Navbar />
      <Outlet />
    </div>
  );
}

export const Route = createFileRoute('/(app)/_app')({
  component: Layout,
});
