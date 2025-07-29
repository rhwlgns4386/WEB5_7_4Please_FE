import { requests } from '@/lib/axiosConfig';
import type { Order, OrderUpdateRequest } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';

export const getOrder = ({
  orderId,
}: {
  orderId: number;
}): Promise<AxiosResponse<Order>> => {
  return requests({
    url: `/api/v1/orders/${orderId}`,
    method: 'GET',
  });
};

export const updateOrder = ({
  orderId,
  data,
}: {
  orderId: number;
  data: OrderUpdateRequest;
}) => {
  return requests({
    url: `/api/v1/orders/${orderId}`,
    method: 'PUT',
    data,
  });
};

export const createOrder = ({
  auctionId,
  data,
  type,
}: {
  auctionId: number;
  type: string;
  data: {
    price: number;
  };
}) => {
  return requests({
    url: `/api/v1/auctions/${auctionId}/orders/${type}`,
    method: 'POST',
    data,
  });
};

// Tanstack Query Hooks

export const useGetOrder = (orderId: number) => {
  return useQuery({
    queryKey: ['orders', orderId],
    queryFn: () => getOrder({ orderId }),
    enabled: !!orderId,
    select: data => data.data,
  });
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateOrder,
    onSuccess: (_, { orderId }) => {
      queryClient.invalidateQueries({ queryKey: ['orders', orderId] });
    },
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['auctions'] });
    },
  });
};
