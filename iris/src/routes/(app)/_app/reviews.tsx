import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/_app/reviews')({
  component: () => <div>Hello /(app)/_app/reviews!</div>,
})
