import { requests } from '@/lib/axiosConfig';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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
    },
  });
};
