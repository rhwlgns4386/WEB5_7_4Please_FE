import { requests } from '@/lib/axiosConfig';
import type { ReviewList } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';

export const getReviews = ({
  page,
  size,
  sort,
}: {
  page: number;
  size: number;
  sort?: string;
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

// Tanstack Query Hooks

export const useGetReviews = (page: number, size: number, sort?: string) => {
  return useQuery({
    queryKey: ['reviews', { page, size, sort }],
    queryFn: () => getReviews({ page, size, sort }),
    select: data => data.data,
  });
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
  });
};
