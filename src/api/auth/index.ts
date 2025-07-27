import { requests } from '@/lib/axiosConfig';
import type { SigninType, SocialLoginResponse } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError, AxiosResponse } from 'axios';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import { useUserStore } from '@/store/user';

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
  state,
}: {
  type: SigninType;
  code: string;
  state: string;
}): Promise<AxiosResponse<SocialLoginResponse>> => {
  return requests({
    url: `/api/v1/login/${type}`,
    method: 'POST',
    params: {
      code,
      state,
    },
  });
};

// Tanstack Query Hooks

export const useRefreshToken = () => {
  return useMutation({ mutationFn: refreshToken });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['member'] });
    },
  });
};

export const useDeleteMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMember,
    onSuccess: () => {
      queryClient.invalidateQueries(); // 모든 쿼리 무효화
    },
  });
};

export const useSocialLogin = () => {
  const navigate = useNavigate();
  const { setAccessToken } = useUserStore();
  return useMutation({
    mutationFn: socialLogin,
    onSuccess: data => {
      const accessToken = data.headers.authorization?.split(' ')[1];
      if (accessToken) {
        setAccessToken(accessToken);
        toast.success('로그인에 성공했습니다.');
        navigate({
          to: '/',
        });
      }
    },
    onError: (error: AxiosError<{ token: string }>) => {
      if (error.response?.status === 401 && error.response.data?.token) {
        toast('계정이 없습니다. 회원가입 페이지로 이동합니다.');
        navigate({
          to: '/signup',
          search: {
            token: error.response.data.token,
          },
        });
      } else {
        // 기타 에러 처리
        toast.error('로그인 중 오류가 발생했습니다.');
        navigate({ to: '/login' });
      }
    },
  });
};
