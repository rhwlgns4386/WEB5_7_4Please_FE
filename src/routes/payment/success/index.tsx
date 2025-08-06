import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useConfirmPayment } from '@/api/payment';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

const paymentSuccessSearchSchema = z.object({
  paymentKey: z.string(),
  orderId: z.string(),
  amount: z.number(),
});

export const Route = createFileRoute('/payment/success/')({
  validateSearch: paymentSuccessSearchSchema,
  component: PaymentSuccess,
});

function PaymentSuccess() {
  const navigate = useNavigate();
  const { paymentKey, orderId, amount } = Route.useSearch();
  const { mutate: confirmPayment } = useConfirmPayment();
  const hasExecuted = useRef(false);

  useEffect(() => {
    if (paymentKey && orderId && amount && !hasExecuted.current) {
      hasExecuted.current = true;

      confirmPayment(
        { paymentKey, orderId, amount: Number(amount) },
        {
          onSuccess: () => {
            toast.success('결제가 성공적으로 완료되었습니다.');
            navigate({ to: '/mypage' });
          },
          onError: (error: any) => {
            toast.error(
              `결제 승인에 실패했습니다: ${error.response?.data?.message || error.message}`
            );
            navigate({ to: '/mypage' });
          },
        }
      );
    }
  }, [paymentKey, orderId, amount, confirmPayment, navigate]);

  return (
    <div className='flex flex-col items-center justify-center h-screen gap-4'>
      <h1 className='text-3xl font-bold'>결제 승인 중...</h1>
      <p className='text-gray-600'>잠시만 기다려주세요.</p>
    </div>
  );
}