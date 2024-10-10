import { HomePage } from '@/app/home/page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/_app/home')({
  component: HomePage,
})
