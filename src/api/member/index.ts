import { requests } from '@/lib/axiosConfig';
import type { SignupResponse } from '@/types';
import type { AxiosResponse } from 'axios';

export const createWishList = ({ auctionId }: { auctionId: number }) => {
  return requests({
    url: '/api/v1/wishlist',
    method: 'POST',
    data: {
      auctionId,
    },
  });
};

export const signup = ({
  token,
  nickName,
}: {
  token: string;
  nickName: string;
}): Promise<AxiosResponse<SignupResponse>> => {
  return requests({
    url: `/api/v1/signup/${token}`,
    method: 'POST',
    data: {
      nickName,
    },
  });
};
