import { Button } from '@/components/ui/button';
import Logo from '@/assets/logo.svg?react';
import { Link } from '@tanstack/react-router';

export default function Header() {
  return (
    <div className='w-full flex justify-between items-center py-4 px-8 border-b border-gray-200 fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-950'>
      <Link to='/'>
        <div className='flex items-center gap-2'>
          <Logo />
          <span className='text-2xl font-bold'>Deal4U</span>

          <span className='text-md text-gray-500'>당신을 위한 거래</span>
        </div>
      </Link>
      <div>
        <Button variant='outline'>
          <Link to='/login'>
            <span>로그인</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
