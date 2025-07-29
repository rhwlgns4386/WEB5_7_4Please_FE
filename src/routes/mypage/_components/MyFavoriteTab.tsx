import { useGetWishList } from '@/api/wishlist';
import CommonSelect from '@/components/common-select';
import { Badge } from '@/components/ui/badge';
import MyFavoriteCard from '@/routes/mypage/_components/myFavorite/MyFavoriteCard';
import { LucideHeart } from 'lucide-react';
import { useState } from 'react';

export default function MyFavoriteTab() {
  const [size, setSize] = useState(5);
  const sortOptions = [
    { value: 'latest', label: '최신순' },
    { value: 'oldest', label: '오래된순' },
  ];

  const searchOptions = [
    { value: '5', label: '5개씩 보기' },
    { value: '10', label: '10개씩 보기' },
    { value: '20', label: '20개씩 보기' },
  ];

  const { data: wishlist } = useGetWishList({
    page: 0,
    size,
  });

  console.log(wishlist);

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
            defaultValue={size.toString()}
            onValueChange={value => setSize(Number(value))}
          />
          <Badge variant={'secondary'}>총 {wishlist?.totalElements}건</Badge>
        </div>
      </div>
      {wishlist?.content.map(item => (
        <MyFavoriteCard key={item.wishlistId} wishlist={item} />
      ))}
    </div>
  );
}
