import { requests } from '@/lib/axiosConfig';
import type { BidList, Pageable } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';
import { toast } from 'sonner';

export const createBids = ({
  auctionId,
  price,
}: {
  auctionId: number;
  price: number;
}) => {
  return requests({
    url: '/api/v1/bids',
    method: 'POST',
    data: {
      auctionId,
      price,
    },
  });
};

export const getBidList = ({
  auctionId,
  pageable,
}: {
  auctionId: number;
  pageable: Pageable;
}): Promise<AxiosResponse<BidList>> => {
  return requests({
    url: `/api/v1/auctions/${auctionId}/bids`,
    method: 'GET',
    params: pageable,
  });
};

export const deleteBid = ({ bidId }: { bidId: number }) => {
  return requests({
    url: `/api/v1/bids/${bidId}`,
    method: 'DELETE',
  });
};

// Tanstack Query Hooks

export const useGetBidList = (auctionId: number, pageable: Pageable) => {
  return useQuery({
    queryKey: ['bids', auctionId, pageable],
    queryFn: () => getBidList({ auctionId, pageable }),
    enabled: !!auctionId,
    select: data => data.data,
  });
};

export const useCreateBid = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBids,
    onSuccess: (_, { auctionId }) => {
      queryClient.invalidateQueries({ queryKey: ['bids', auctionId] });
      queryClient.invalidateQueries({ queryKey: ['auctionDetail', auctionId] });
    },
  });
};

export const useDeleteBid = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBid,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bids'] });
      queryClient.invalidateQueries({ queryKey: ['auctionDetail'] });
      toast.success('입찰이 취소되었습니다.');
    },
  });
};
