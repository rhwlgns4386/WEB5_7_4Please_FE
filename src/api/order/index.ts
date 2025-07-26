import { requests } from '@/lib/axiosConfig';
import type { Order, OrderUpdateRequest } from '@/types';
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
  type: 'buyNow' | 'bid';
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
