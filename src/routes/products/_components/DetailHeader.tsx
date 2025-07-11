import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';
import { LucideArrowLeft, LucideHeart, LucideShare } from 'lucide-react';

export default function DetailHeader() {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate({ to: '/products' });
  };
  return (
    <div className='w-full flex justify-between items-center py-4 px-8 border-b border-gray-200 fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-950'>
      <div className='flex items-center gap-2'>
        <Button variant='ghost' className='p-0' onClick={handleGoBack}>
          <LucideArrowLeft />
          <span className='text-md text-gray-300'>돌아가기</span>
        </Button>
      </div>
      <div className='flex items-center gap-2'>
        <Button variant='outline'>
          <LucideHeart />
          관심
        </Button>
        <Button variant='outline'>
          <LucideShare />
          공유하기
        </Button>
      </div>
    </div>
  );
}
