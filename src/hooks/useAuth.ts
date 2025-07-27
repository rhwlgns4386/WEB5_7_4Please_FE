import { signup } from '@/api/member';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';

export default function useAuth() {
  const navigate = useNavigate();
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

  const { mutate: signupMutation } = useMutation({
    mutationFn: signup,
    onSuccess: data => {
      toast.success('회원가입이 완료되었습니다.');
      if (data.data.accessToken) {
        localStorage.setItem('token', data.data.accessToken);
      }
      navigate({ to: data.data.redirectUrl });
    },
    onError: error => {
      toast.error('회원가입 중 오류가 발생했습니다.');
    },
  });

  return {
    handleClickGoogleLogin,
    handleClickNaverLogin,
    signupMutation,
  };
}
