import { requests } from '@/lib/axiosConfig';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

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
      toast.success('차상위 입찰 제안이 완료되었습니다.');
    },
  });
};
