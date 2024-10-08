import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: () => <div>Hello /!</div>,
  pendingComponent: () => <div>Loading...</div>,
  loader: async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return {
      data: 'Hello /!',
    };
  },
});
