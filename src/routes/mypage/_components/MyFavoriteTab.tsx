import { useGetWishList } from '@/api/wishlist';
import CommonSelect from '@/components/common-select';
import { Badge } from '@/components/ui/badge';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import MyFavoriteCard from '@/routes/mypage/_components/myFavorite/MyFavoriteCard';
import { LucideHeart, LucideInfo } from 'lucide-react';
import { useState } from 'react';

export default function MyFavoriteTab() {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [sort, setSort] = useState('latest');

  const sortOptions = [
    { value: 'latest', label: '최신순' },
    { value: 'oldest', label: '오래된순' },
  ];

  const searchOptions = [
    { value: '5', label: '5개씩 보기' },
    { value: '10', label: '10개씩 보기' },
    { value: '15', label: '15개씩 보기' },
    { value: '20', label: '20개씩 보기' },
  ];

  const { data: wishlist } = useGetWishList({
    page,
    size,
    order: sort === 'latest' ? 'createdAt,desc' : 'createdAt,asc',
  });

  const handleFilterChange = (
    type: 'size' | 'sort',
    value: string | number
  ) => {
    if (type === 'size') {
      setSize(Number(value));
    } else {
      setSort(String(value));
    }
    setPage(0); // 필터 변경 시 첫 페이지로 리셋
  };

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between items-center w-full border-b border-gray-500 pb-4'>
        <div className='flex items-center gap-2'>
          <LucideHeart className='w-6 h-6' />
          <span className='text-2xl font-bold'>관심 목록</span>
        </div>
        <div className='flex gap-2'>
          <CommonSelect
            label='정렬 순서'
            options={sortOptions}
            defaultValue={sort}
            onValueChange={value => handleFilterChange('sort', value)}
          />
          <CommonSelect
            label='보기 조건'
            options={searchOptions}
            defaultValue={size.toString()}
            onValueChange={value => handleFilterChange('size', value)}
          />
          <Badge variant={'secondary'}>
            총 {wishlist?.totalElements ?? 0}건
          </Badge>
        </div>
      </div>
      {wishlist && wishlist.content.length > 0 ? (
        <>
          <div className='flex flex-col gap-6'>
            {wishlist.content.map(item => (
              <MyFavoriteCard key={item.wishlistId} wishlist={item} />
            ))}
          </div>

          {wishlist.totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href='#'
                    onClick={e => {
                      e.preventDefault();
                      setPage(prev => Math.max(0, prev - 1));
                    }}
                    className={
                      page === 0 ? 'pointer-events-none opacity-50' : ''
                    }
                  />
                </PaginationItem>
                {[...Array(wishlist.totalPages)].map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href='#'
                      isActive={page === i}
                      onClick={e => {
                        e.preventDefault();
                        setPage(i);
                      }}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href='#'
                    onClick={e => {
                      e.preventDefault();
                      setPage(prev =>
                        Math.min(wishlist.totalPages - 1, prev + 1)
                      );
                    }}
                    className={
                      page === wishlist.totalPages - 1
                        ? 'pointer-events-none opacity-50'
                        : ''
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      ) : (
        <div className='flex flex-col items-center justify-center gap-4 h-64 rounded-lg bg-gray-800/50'>
          <LucideInfo className='w-12 h-12 text-gray-500' />
          <p className='text-lg font-semibold text-gray-400'>
            관심 목록이 없습니다.
          </p>
          <p className='text-sm text-gray-500'>
            마음에 드는 상품을 추가해보세요!
          </p>
        </div>
      )}
    </div>
  );
}
