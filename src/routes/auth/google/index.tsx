import { useSocialLogin } from '@/api/auth';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';
import { z } from 'zod';

export const Route = createFileRoute('/auth/google/')({
  component: RouteComponent,
  validateSearch: z.object({
    code: z.string(),
    state: z.string(),
  }),
  staticData: {
    hideHeader: true,
  },
});

function RouteComponent() {
  const { code, state } = Route.useSearch();

  const { mutate: socialLoginMutation } = useSocialLogin();

  useEffect(() => {
    socialLoginMutation({
      type: 'google',
      code,
      state,
    });
  }, [code, state, socialLoginMutation]);

  return (
    <div className='w-full h-full flex items-center justify-center mt-24'></div>
  );
}
