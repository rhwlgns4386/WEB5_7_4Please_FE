import { requests } from '@/lib/axiosConfig';
import type { WishList } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';

export const createWishList = ({
  auctionId,
}: {
  auctionId: number;
}): Promise<AxiosResponse<WishList>> => {
  return requests({
    url: '/api/v1/wishlist',
    method: 'POST',
    data: {
      auctionId,
    },
  });
};

export const getWishList = ({
  page,
  size,
  order,
}: {
  page: number;
  size: number;
  order?: string;
}): Promise<AxiosResponse<WishList>> => {
  return requests({
    url: '/api/v1/wishlist',
    method: 'GET',
    params: {
      page,
      size,
      order,
    },
  });
};

export const deleteWishList = ({ wishlistId }: { wishlistId: number }) => {
  return requests({
    url: `/api/v1/wishlist/${wishlistId}`,
    method: 'DELETE',
  });
};

// Tanstack Query Hooks

export const useGetWishList = (page: number, size: number, order?: string) => {
  return useQuery({
    queryKey: ['wishlist', { page, size, order }],
    queryFn: () => getWishList({ page, size, order }),
    select: data => data.data,
  });
};

export const useCreateWishList = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createWishList,
    onSuccess: (_, { auctionId }) => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      queryClient.invalidateQueries({ queryKey: ['auctions'] });
      queryClient.invalidateQueries({ queryKey: ['auctionDetail', auctionId] });
    },
  });
};

export const useDeleteWishList = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteWishList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      queryClient.invalidateQueries({ queryKey: ['auctions'] });
    },
  });
};
