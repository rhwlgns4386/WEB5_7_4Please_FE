import { useGetMyBidList } from '@/api/my';
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
import BiddingHistoryCard from '@/routes/mypage/_components/mybidding/BiddingHistoryCard';
import { LucideLayoutList, LucideInfo } from 'lucide-react';
import { useState } from 'react';

export default function MyBiddingTab() {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);

  const searchOptions = [
    {
      value: '5',
      label: '5개씩 보기',
    },
    {
      value: '10',
      label: '10개씩 보기',
    },
    {
      value: '15',
      label: '15개씩 보기',
    },
    {
      value: '20',
      label: '20개씩 보기',
    },
  ];

  const { data: myBidList } = useGetMyBidList({
    page,
    size,
  });

  const handleSizeChange = (value: string) => {
    setSize(Number(value));
    setPage(0); // size가 바뀌면 첫 페이지로 리셋
  };

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between items-center w-full border-b border-gray-500 pb-4'>
        <div className='flex items-center gap-2'>
          <LucideLayoutList className='w-6 h-6' />
          <span className='text-2xl font-bold'>내 입찰 내역</span>
        </div>
        <div className='flex gap-2'>
          <CommonSelect
            label='보기 조건'
            options={searchOptions}
            defaultValue={String(size)}
            onValueChange={handleSizeChange}
          />
          <Badge variant={'secondary'}>
            총 {myBidList?.totalElements ?? 0}건
          </Badge>
        </div>
      </div>
      {myBidList && myBidList.content.length > 0 ? (
        <>
          <div className='flex flex-col gap-6'>
            {myBidList.content.map(bid => (
              <BiddingHistoryCard key={bid.bidId} bid={bid} />
            ))}
          </div>
          {myBidList.totalPages > 1 && (
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
                {[...Array(myBidList.totalPages)].map((_, i) => (
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
                        Math.min(myBidList.totalPages - 1, prev + 1)
                      );
                    }}
                    className={
                      page === myBidList.totalPages - 1
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
            입찰 내역이 없습니다.
          </p>
          <p className='text-sm text-gray-500'>
            관심 있는 상품에 입찰해보세요!
          </p>
        </div>
      )}
    </div>
  );
}
