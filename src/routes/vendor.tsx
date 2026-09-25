import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/vendor')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/vendor"!</div>
}
