import { requests } from '@/lib/axiosConfig';
import type { MemberInfo, MyAuctionList, MyBidList, Pageable } from '@/types';
import { useQuery } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';

export const getMyBidList = (
  pageable: Pageable
): Promise<AxiosResponse<MyBidList>> => {
  return requests({
    url: `/api/v1/my/bids`,
    method: 'GET',
    params: pageable,
  });
};

export const getMyAuctionList = (
  pageable: Pageable
): Promise<AxiosResponse<MyAuctionList>> => {
  return requests({
    url: `/api/v1/my/auctions`,
    method: 'GET',
    params: pageable,
  });
};

export const getMyMemberInfo = (): Promise<AxiosResponse<MemberInfo>> => {
  return requests({
    url: `/api/v1/my/member`,
    method: 'GET',
  });
};

// ************ react-query ************

export const useGetMyMemberInfo = () => {
  return useQuery({
    queryKey: ['myMemberInfo'],
    queryFn: getMyMemberInfo,
    select: data => data.data,
  });
};

export const useGetMyBidList = (pageable: Pageable) => {
  return useQuery({
    queryKey: ['myBidList', pageable],
    queryFn: () => getMyBidList(pageable),
    select: data => data.data,
  });
};

export const useGetMyAuctionList = (pageable: Pageable) => {
  return useQuery({
    queryKey: ['myAuctionList', pageable],
    queryFn: () => getMyAuctionList(pageable),
    select: data => data.data,
  });
};
