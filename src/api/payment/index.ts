import { requests } from '@/lib/axiosConfig';
import type { Payment } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const createPayment = (data: Payment) => {
  return requests({
    url: `/api/v1/payments/confirm`,
    method: 'POST',
    data,
  });
};

// Tanstack Query Hooks

export const useCreatePayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};

export const confirmPayment = (data: Payment) => {
  return requests({
    url: '/api/v1/payments/confirm',
    method: 'POST',
    data,
  });
};

export const useConfirmPayment = () => {
  return useMutation({
    mutationFn: confirmPayment,
  });
};
