import { useSocialLogin } from '@/api/auth';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';
import { z } from 'zod';

export const Route = createFileRoute('/auth/naver/')({
  validateSearch: z.object({
    code: z.string(),
    state: z.string(),
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { code, state } = Route.useSearch();

  const { mutate: socialLoginMutation } = useSocialLogin();

  useEffect(() => {
    socialLoginMutation({
      type: 'naver',
      code,
      state,
    });
  }, [code, state, socialLoginMutation]);

  return <></>;
}
