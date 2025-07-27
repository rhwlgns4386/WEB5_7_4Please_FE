import { Button } from '@/components/ui/button';
import Logo from '@/assets/logo.svg?react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useUserStore } from '@/store/user';
import useAuth from '@/hooks/useAuth';

export default function Header() {
  const navigate = useNavigate();
  const { user, accessToken } = useUserStore();
  const { logout } = useAuth();

  const goToRegisterProduct = () => {
    navigate({ to: '/registerProduct' });
  };
  const goToMyPage = () => {
    navigate({ to: '/mypage' });
  };
  return (
    <div className='w-full flex justify-between items-center py-4 px-8 border-b border-gray-200 fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-950'>
      <Link to='/'>
        <div className='flex items-center gap-2'>
          <Logo />
          <span className='text-2xl font-bold'>Deal4U</span>
          <span className='text-md text-gray-500'>당신을 위한 거래</span>
        </div>
      </Link>

      {accessToken ? (
        <div className='flex items-center gap-2'>
          <Button variant={'outline'} onClick={goToRegisterProduct}>
            판매하기
          </Button>
          <Button variant={'outline'} onClick={goToMyPage}>
            마이페이지
          </Button>
          <Button variant={'outline'} onClick={logout}>
            로그아웃
          </Button>
          <span className='text-md text-white underline underline-offset-4'>
            {user?.nickName}님
          </span>
        </div>
      ) : (
        <div>
          <Button variant='outline' onClick={() => navigate({ to: '/login' })}>
            <span>로그인</span>
          </Button>
        </div>
      )}
    </div>
  );
}
