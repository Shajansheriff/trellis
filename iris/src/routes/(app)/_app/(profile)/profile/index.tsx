import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(app)/_app/(profile)/profile/')({
  component: () => <div>Hello /(app)/_app/(profile)/profile/!</div>,
});
