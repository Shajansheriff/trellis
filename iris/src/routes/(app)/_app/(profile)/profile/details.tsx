import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(app)/_app/(profile)/profile/details')({
  component: () => <div>Hello /(app)/_app/(profile)/profile/details!</div>,
});
