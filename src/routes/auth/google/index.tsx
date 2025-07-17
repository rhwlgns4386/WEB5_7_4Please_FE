import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

export const Route = createFileRoute('/auth/google/')({
  component: RouteComponent,
  validateSearch: z.object({
    code: z.string(),
  }),
});

function RouteComponent() {
  const { code } = Route.useSearch();
  console.log(code);
  return (
    <div>
      <h1>Google Login</h1>
    </div>
  );
}
