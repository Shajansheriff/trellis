import { Navbar } from '@/components/navbar';
import { createFileRoute } from '@tanstack/react-router';

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export const Route = createFileRoute('/_layout')({
  component: Layout,
});
