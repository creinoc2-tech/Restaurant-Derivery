import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(store)/_layout/cart')({
  component: RouteComponent,
})

function RouteComponent() {
   return <div> Hola mundo </div>
}