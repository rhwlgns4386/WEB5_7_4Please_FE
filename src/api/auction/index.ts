import { request } from '@/lib/axiosConfig';
import type { CreateAuctionRequest } from '@/types';

export const createAuction = ({ data }: { data: CreateAuctionRequest }) => {
  return request.post('/api/v1/auctions', data);
};
