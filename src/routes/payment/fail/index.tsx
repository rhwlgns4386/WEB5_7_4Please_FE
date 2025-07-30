import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { z } from 'zod';

const paymentFailSearchSchema = z.object({
  message: z.string(),
  code: z.string(),
});

export const Route = createFileRoute('/payment/fail/')({
  validateSearch: paymentFailSearchSchema,
  component: PaymentFail,
});

function PaymentFail() {
  const navigate = useNavigate();
  const { message, code } = Route.useSearch();

  return (
    <div className='flex flex-col items-center justify-center h-screen gap-6 text-center'>
      <h1 className='text-4xl font-bold text-red-500'>결제 실패</h1>
      <div className='p-4 bg-gray-100 rounded-md text-left'>
        <p className='text-lg'>
          <span className='font-semibold'>에러 코드:</span> {code}
        </p>
        <p className='text-lg'>
          <span className='font-semibold'>실패 사유:</span> {message}
        </p>
      </div>
      <p className='text-gray-600'>
        결제를 다시 시도하시거나, 문제가 지속되면 고객센터로 문의해주세요.
      </p>
      <Button onClick={() => navigate({ to: '/mypage' })}>
        마이페이지로 돌아가기
      </Button>
    </div>
  );
}
