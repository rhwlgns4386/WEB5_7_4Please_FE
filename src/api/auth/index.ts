import { requests } from '@/lib/axiosConfig';
import type { SigninType, SocialLoginResponse } from '@/types';
import type { AxiosResponse } from 'axios';

export const refreshToken = () => {
  return requests({
    url: `/api/v1/auth/refresh/token`,
    method: 'POST',
  });
};

export const logout = () => {
  // cookie로 refreshtoken을 파라미터로 전달해야함.
  return requests({
    url: `/api/v1/auth/logout`,
    method: 'POST',
  });
};

export const deleteMember = () => {
  return requests({
    url: `/api/v1/auth/members`,
    method: 'DELETE',
  });
};

/**
 * 소셜 로그인 요청
 */
export const socialLogin = ({
  type,
  code,
}: {
  type: SigninType;
  code: string;
}): Promise<AxiosResponse<SocialLoginResponse>> => {
  return requests({
    url: `/api/v1/login/${type}`,
    method: 'POST',
    params: {
      code,
    },
  });
};
