import { requests } from '@/lib/axiosConfig';

export const createSettlement = ({ auctionId }: { auctionId: number }) => {
  return requests({
    url: `/api/v1/auctions/${auctionId}/second-bidder/offer`,
    method: 'POST',
  });
};
