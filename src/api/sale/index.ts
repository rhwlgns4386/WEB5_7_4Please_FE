import { requests } from '@/lib/axiosConfig';
import type { Pageable } from '@/types';

export const readSales = ({
  sellerId,
  pageable,
}: {
  sellerId: number;
  pageable: Pageable;
}) => {
  return requests({
    url: `/api/v1/sales/${sellerId}`,
    method: 'GET',
    params: pageable,
  });
};
