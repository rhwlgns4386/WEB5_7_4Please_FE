import CommonSelect from '@/components/common-select';
import { Badge } from '@/components/ui/badge';
import MyFavoriteCard from '@/routes/mypage/_components/myFavorite/MyFavoriteCard';
import { LucideHeart } from 'lucide-react';

export default function MyFavoriteTab() {
  const sortOptions = [
    { value: 'latest', label: '최신순' },
    { value: 'oldest', label: '오래된순' },
  ];

  const searchOptions = [
    { value: 'five', label: '5개씩 보기' },
    { value: 'ten', label: '10개씩 보기' },
    { value: 'twenty', label: '20개씩 보기' },
  ];

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between items-center w-full border-b border-gray-500 pb-4'>
        <div className='flex items-center gap-2'>
          <LucideHeart className='w-6 h-6' />
          <span className='text-2xl font-bold'>관심 목록</span>
        </div>
        <div className='flex gap-2'>
          <div></div>
          <CommonSelect
            label='정렬 순서'
            options={sortOptions}
            defaultValue='latest'
          />
          <CommonSelect
            label='보기 조건'
            options={searchOptions}
            defaultValue='five'
          />
          <Badge variant={'secondary'}>총 15건</Badge>
        </div>
      </div>
      <MyFavoriteCard />
    </div>
  );
}
