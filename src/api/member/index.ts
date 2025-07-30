import { requests } from '@/lib/axiosConfig';
import type { SigninResponse, SigninType, SignupResponse } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import type { AxiosResponse } from 'axios';
import { toast } from 'sonner';
import { useUserStore } from '@/store/user';

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
    method: 'PATCH',
    data: {
      nickName,
    },
  });
};

export const getNickname = () => {
  return requests({
    url: `/api/v1/member/check`,
    method: 'GET',
  });
};

export const getLoginPage = ({ type }: { type: SigninType }) => {
  return requests({
    url: `/api/v1/login/page/${type}`,
    method: 'GET',
  });
};

// Tanstack Query Hooks

export const useGetLoginPage = ({ type }: { type: SigninType }) => {
  return useQuery({
    queryKey: ['loginPage', type],
    queryFn: () => getLoginPage({ type }),
    select: data => data.data,
  });
};

export const useGetNickname = () => {
  return useQuery({
    queryKey: ['member', 'nickname'],
    queryFn: getNickname,
    select: data => data.data,
  });
};

export const useSignup = () => {
  const navigate = useNavigate();
  const { setAccessToken } = useUserStore();
  return useMutation({
    mutationFn: signup,
    onSuccess: data => {
      toast.success('회원가입이 완료되었습니다.');
      if (data.data.accessToken) {
        setAccessToken(data.data.accessToken);
      }
      navigate({ to: data.data.redirectUrl });
    },
    onError: () => {
      toast.error('회원가입 중 오류가 발생했습니다.');
    },
  });
};

export const useSignin = () => {
  return useMutation({ mutationFn: signin });
};

export const useUpdateNickname = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: updateNickname,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['member'] });
      queryClient.invalidateQueries({ queryKey: ['member', 'myMemberInfo'] });
      toast.success('닉네임이 변경되었습니다.');
      navigate({ to: '/mypage' });
    },
    onError: error => {
      toast.error(error.message);
    },
  });
};
