import { request } from '@/lib/axiosConfig';

export const createWishList = ({ auctionId }: { auctionId: number }) => {
  return request({
    url: '/api/v1/wishlist',
    method: 'POST',
    data: {
      auctionId,
    },
  });
};
