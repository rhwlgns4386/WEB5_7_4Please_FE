import { requests } from '@/lib/axiosConfig';

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
