import { requests } from '@/lib/axiosConfig';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const createSettlement = ({ auctionId }: { auctionId: number }) => {
  return requests({
    url: `/api/v1/auctions/${auctionId}/second-bidder/offer`,
    method: 'POST',
  });
};

// Tanstack Query Hooks

export const useCreateSettlement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSettlement,
    onSuccess: (_, { auctionId }) => {
      queryClient.invalidateQueries({ queryKey: ['settlements'] });
      queryClient.invalidateQueries({ queryKey: ['auctions', auctionId] });
    },
  });
};
