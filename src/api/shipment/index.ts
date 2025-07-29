import { requests } from '@/lib/axiosConfig';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const updateShipment = ({ auctionId }: { auctionId: number }) => {
  return requests({
    url: `/api/v1/auctions/${auctionId}/shipment/confirm`,
    method: 'PUT',
  });
};

export const createShipment = ({ auctionId }: { auctionId: number }) => {
  return requests({
    url: `/api/v1/auctions/${auctionId}/shipment`,
    method: 'POST',
  });
};

// Tanstack Query Hooks

export const useCreateShipment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createShipment,
    onSuccess: (_, { auctionId }) => {
      queryClient.invalidateQueries({ queryKey: ['shipments'] });
      queryClient.invalidateQueries({ queryKey: ['auctions', auctionId] });
      toast.success('운송장 번호 등록 성공');
    },
  });
};

export const useUpdateShipment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateShipment,
    onSuccess: (_, { auctionId }) => {
      queryClient.invalidateQueries({ queryKey: ['shipments'] });
      queryClient.invalidateQueries({ queryKey: ['auctions', auctionId] });
      toast.success('구매 확정되었습니다.');
    },
  });
};
