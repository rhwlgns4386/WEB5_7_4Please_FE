import NicknameForm from '@/components/nickname-form';
import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

export const Route = createFileRoute('/auth/google/')({
  component: RouteComponent,
  validateSearch: z.object({
    code: z.string(),
  }),
  staticData: {
    hideHeader: true,
  },
});

function RouteComponent() {
  const { code } = Route.useSearch();

  console.log(code);
  return (
    <div className='w-full h-full flex items-center justify-center mt-24'>
      <NicknameForm token={code} />
    </div>
  );
}
