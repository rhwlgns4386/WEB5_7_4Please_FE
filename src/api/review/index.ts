import { requests } from '@/lib/axiosConfig';
import type { ReviewList } from '@/types';
import {
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from '@tanstack/react-query';

export const getReviews = async ({
  memberId,
  page,
  size,
  sort,
}: {
  page: number;
  size: number;
  sort?: string;
  memberId: number;
}): Promise<ReviewList> => {
  const response = await requests({
    url: `/api/v1/reviews/${memberId}`,
    method: 'GET',
    params: {
      page,
      size,
      sort,
    },
  });
  return response.data;
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

export const useGetReviews = ({
  memberId,
  enabled,
}: {
  memberId: number;
  enabled: boolean;
}) => {
  return useInfiniteQuery({
    queryKey: ['reviews', memberId],
    queryFn: ({ pageParam = 0 }) =>
      getReviews({ memberId, page: pageParam, size: 3 }),
    getNextPageParam: lastPage => {
      return lastPage.page < lastPage.totalPages - 1
        ? lastPage.page + 1
        : undefined;
    },
    initialPageParam: 0,
    enabled,
    select: data => ({
      pages: data.pages.flatMap(page => page.content),
      pageParams: data.pageParams,
    }),
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
