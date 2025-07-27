import { requests } from '@/lib/axiosConfig';
import type { AuctionList, CreateAuctionRequest, ProductDetail } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';

export const postAuction = ({ data }: { data: CreateAuctionRequest }) => {
  return requests({
    url: '/api/v1/auctions',
    method: 'POST',
    data,
  });
};

export const getAuctionList = ({
  page,
  size,
  keyword,
  categoryId,
  order,
}: {
  page: number;
  size: number;
  keyword: string;
  categoryId: number | undefined;
  order: string;
}): Promise<AxiosResponse<AuctionList>> => {
  return requests({
    url: '/api/v1/auctions',
    method: 'GET',
    params: { page, size, keyword, categoryId, order },
  });
};

export const s3Upload = (formData: FormData) => {
  return requests({
    url: '/api/v1/auctions/images',
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getProductDetail = ({
  auctionId,
}: {
  auctionId: number;
}): Promise<AxiosResponse<ProductDetail>> => {
  return requests({
    url: `/api/v1/auctions/${auctionId}/description`,
    method: 'GET',
  });
};

export const deleteAuction = ({ auctionId }: { auctionId: number }) => {
  return requests({
    url: `/api/v1/auctions/${auctionId}`,
    method: 'DELETE',
  });
};

// Tanstack Query Hooks

export const useGetAuctionList = ({
  page,
  size,
  keyword,
  categoryId,
  order,
}: {
  page: number;
  size: number;
  keyword: string;
  categoryId: number | undefined;
  order: string;
}) => {
  return useQuery({
    queryKey: ['auctions', { page, size, keyword, categoryId, order }],
    queryFn: () => getAuctionList({ page, size, keyword, categoryId, order }),
    select: data => data.data,
  });
};

export const useGetProductDetail = (auctionId: number) => {
  return useQuery({
    queryKey: ['auctionDetail', auctionId],
    queryFn: () => getProductDetail({ auctionId }),
    enabled: !!auctionId,
    select: data => data.data,
  });
};

export const usePostAuction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postAuction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auctions'] });
    },
  });
};

export const useS3Upload = () => {
  return useMutation({
    mutationFn: s3Upload,
  });
};

export const useDeleteAuction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAuction,
    onSuccess: (_, { auctionId }) => {
      queryClient.invalidateQueries({ queryKey: ['auctions'] });
      queryClient.invalidateQueries({ queryKey: ['auctionDetail', auctionId] });
    },
  });
};
