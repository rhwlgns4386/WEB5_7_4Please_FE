import { requests } from '@/lib/axiosConfig';
import type { ReviewList } from '@/types';
import type { AxiosResponse } from 'axios';

export const getReviews = ({
  page,
  size,
  sort,
}: {
  page: number;
  size: number;
  sort: string[];
}): Promise<AxiosResponse<ReviewList>> => {
  return requests({
    url: `/api/v1/reviews`,
    method: 'GET',
    params: {
      page,
      size,
      sort,
    },
  });
};

export const createReview = ({
  auctionId,
  rating,
  content,
}: {
  auctionId: number;
  rating: number;
  content: string;
}) => {
  return requests({
    url: `/api/v1/auctions/${auctionId}/review`,
    method: 'POST',
    data: {
      auctionId,
      rating,
      content,
    },
  });
};
