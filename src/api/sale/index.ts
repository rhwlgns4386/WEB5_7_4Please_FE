import { requests } from '@/lib/axiosConfig';
import type { Pageable, SaleList } from '@/types';
import { useQuery } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';

export const getSalesList = ({
  sellerId,
  pageable,
}: {
  sellerId: number;
  pageable: Pageable;
}): Promise<AxiosResponse<SaleList>> => {
  return requests({
    url: `/api/v1/sales/${sellerId}`,
    method: 'GET',
    params: pageable,
  });
};

// Tanstack Query Hooks

export const useGetSalesList = (sellerId: number, pageable: Pageable) => {
  return useQuery({
    queryKey: ['sales', sellerId, pageable],
    queryFn: () => getSalesList({ sellerId, pageable }),
    enabled: !!sellerId,
    select: data => data.data,
  });
};
