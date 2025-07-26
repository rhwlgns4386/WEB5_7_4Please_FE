import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/naver/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/auth/naver/"!</div>
}
