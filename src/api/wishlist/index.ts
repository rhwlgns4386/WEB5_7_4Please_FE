import { requests } from '@/lib/axiosConfig';
import type { WishList } from '@/types';
import type { AxiosResponse } from 'axios';

export const createWishList = ({
  auctionId,
}: {
  auctionId: number;
}): Promise<AxiosResponse<WishList>> => {
  return requests({
    url: '/api/v1/wishlist',
    method: 'POST',
    data: {
      auctionId,
    },
  });
};

export const getWishList = ({
  page,
  size,
  order,
}: {
  page: number;
  size: number;
  order: string;
}): Promise<AxiosResponse<WishList>> => {
  return requests({
    url: '/api/v1/wishlist',
    method: 'GET',
    params: {
      page,
      size,
      order,
    },
  });
};

export const deleteWishList = ({ wishlistId }: { wishlistId: number }) => {
  return requests({
    url: `/api/v1/wishlist/${wishlistId}`,
    method: 'DELETE',
  });
};
