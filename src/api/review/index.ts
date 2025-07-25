import { requests } from '@/lib/axiosConfig';
import type { Pageable, ReviewList } from '@/types';
import type { AxiosResponse } from 'axios';

export const getReviews = ({
  memberId,
  pageable,
}: {
  memberId: number;
  pageable: Pageable;
}): Promise<AxiosResponse<ReviewList>> => {
  return requests({
    url: `/api/v1/reviews/${memberId}`,
    method: 'GET',
    params: pageable,
  });
};
