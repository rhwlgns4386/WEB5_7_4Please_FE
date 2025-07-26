import { requests } from '@/lib/axiosConfig';
import type { BidList, Pageable } from '@/types';
import type { AxiosResponse } from 'axios';

export const createBids = ({
  auctionId,
  price,
}: {
  auctionId: number;
  price: number;
}) => {
  return requests({
    url: '/api/v1/bids',
    method: 'POST',
    data: {
      auctionId,
      price,
    },
  });
};

export const getBids = ({
  auctionId,
  pageable,
}: {
  auctionId: number;
  pageable: Pageable;
}): Promise<AxiosResponse<BidList>> => {
  return requests({
    url: `/api/v1/bids/${auctionId}`,
    method: 'GET',
    params: pageable,
  });
};

export const deleteBid = ({ bidId }: { bidId: number }) => {
  return requests({
    url: `/api/v1/bids/${bidId}`,
    method: 'DELETE',
  });
};
