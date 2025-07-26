import { requests } from '@/lib/axiosConfig';
import type { SigninResponse, SigninType, SignupResponse } from '@/types';
import type { AxiosResponse } from 'axios';

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

export const signin = ({
  type,
  code,
}: {
  type: SigninType;
  code: string;
}): Promise<AxiosResponse<SigninResponse>> => {
  return requests({
    url: `/api/v1/login/${type}?code=${code}`,
    method: 'POST',
  });
};

export const updateNickname = ({ nickName }: { nickName: string }) => {
  return requests({
    url: `/api/v1/members`,
    method: 'PUT',
    data: nickName,
  });
};

export const getNickname = () => {
  return requests({
    url: `/api/v1/member/check`,
    method: 'GET',
  });
};
