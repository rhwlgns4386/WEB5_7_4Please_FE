import { requests } from '@/lib/axiosConfig';

export const createWishList = ({ auctionId }: { auctionId: number }) => {
  return requests({
    url: '/api/v1/wishlist',
    method: 'POST',
    data: {
      auctionId,
    },
  });
};
