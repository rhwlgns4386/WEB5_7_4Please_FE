import { requests } from '@/lib/axiosConfig';
import type { Payment } from '@/types';

export const createPayment = (data: Payment) => {
  return requests({
    url: `/api/v1/payments/confirm`,
    method: 'POST',
    data,
  });
};
