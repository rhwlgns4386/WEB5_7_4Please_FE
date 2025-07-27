import { useLogout } from '@/api/auth';
import { getNickname } from '@/api/member';
import { useUserStore } from '@/store/user';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function useAuth() {
  const navigate = useNavigate();
  const { accessToken, user, setUser, clearUser } = useUserStore();

  const isLoggedIn = !!accessToken;

  const { data: userData, isSuccess } = useQuery({
    queryKey: ['member', accessToken],
    queryFn: getNickname,
    select: res => res.data,
    enabled: isLoggedIn && !user, // 로그인 상태이고, 스토어에 유저 정보가 없을 때만 실행
  });

  useEffect(() => {
    if (isSuccess && userData) {
      setUser(userData);
    }
  }, [isSuccess, userData, setUser]);

  const { mutate: logoutMutation } = useLogout();

  const logout = () => {
    logoutMutation(undefined, {
      onSuccess: () => {
        clearUser();
        toast.success('로그아웃 되었습니다.');
        navigate({ to: '/' });
      },
      onError: () => {
        toast.error('로그아웃 중 오류가 발생했습니다.');
      },
    });
  };

  const handleClickGoogleLogin = () => {
    const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const GOOGLE_REDIRECT_URI = import.meta.env.VITE_GOOGLE_REDIRECT_URI;
    const state = crypto.randomUUID();
    const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=email&state=${state}`;
    window.location.href = GOOGLE_AUTH_URL;
  };

  const handleClickNaverLogin = () => {
    const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
    const NAVER_REDIRECT_URI = import.meta.env.VITE_NAVER_REDIRECT_URI;
    const STATE = crypto.randomUUID();
    const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${NAVER_REDIRECT_URI}`;
    window.location.href = NAVER_AUTH_URL;
  };

  return {
    isLoggedIn,
    user,
    logout,
    handleClickGoogleLogin,
    handleClickNaverLogin,
  };
}
