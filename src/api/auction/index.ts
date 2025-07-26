import { requests } from '@/lib/axiosConfig';
import type { AuctionList, CreateAuctionRequest } from '@/types';
import type { AxiosResponse } from 'axios';

export const postAuction = ({ data }: { data: CreateAuctionRequest }) => {
  return requests({
    url: '/api/v1/auctions',
    method: 'POST',
    data,
  });
};

export const getAuctions = ({
  page,
  size,
  keyword,
  categoryId,
  order,
}: {
  page: number;
  size: number;
  keyword: string;
  categoryId: number | undefined;
  order: string;
}): Promise<AxiosResponse<AuctionList>> => {
  return requests({
    url: '/api/v1/auctions',
    method: 'GET',
    params: { page, size, keyword, categoryId, order },
  });
};

export const s3Upload = (formData: FormData) => {
  return requests({
    url: '/api/v1/auctions/images',
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
