import { requests } from '@/lib/axiosConfig';
import type { WishList } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';
import { toast } from 'sonner';

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

export const deleteWishList = ({ auctionId }: { auctionId: number }) => {
  return requests({
    url: `/api/v1/wishlist/${auctionId}`,
    method: 'DELETE',
  });
};

// Tanstack Query Hooks

export const useGetWishList = ({
  page,
  size,
  order,
}: {
  page: number;
  size: number;
  order?: string;
}) => {
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
      toast.success('관심 상품에 추가되었습니다.');
    },
    onError: () => {
      toast.error('관심 상품에 추가에 실패했습니다.');
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
      queryClient.invalidateQueries({ queryKey: ['auctionDetail'] });
      toast.success('관심 상품에서 제거되었습니다.');
    },
  });
};
