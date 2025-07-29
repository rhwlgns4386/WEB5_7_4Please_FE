import { requests } from '@/lib/axiosConfig';
import type { SaleList } from '@/types';
import { useQuery } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';

export const getSalesList = ({
  sellerId,
  page,
  size,
}: {
  sellerId: number;
  page: number;
  size: number;
}): Promise<AxiosResponse<SaleList>> => {
  return requests({
    url: `/api/v1/sales/${sellerId}`,
    method: 'GET',
    params: { page, size },
  });
};

// Tanstack Query Hooks

export const useGetSalesList = ({
  sellerId,
  page,
  size,
}: {
  sellerId: number;
  page: number;
  size: number;
}) => {
  return useQuery({
    queryKey: ['sales', sellerId, page, size],
    queryFn: () => getSalesList({ sellerId, page, size }),
    enabled: !!sellerId,
    select: data => data.data,
  });
};
