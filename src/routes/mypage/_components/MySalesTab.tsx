import { Badge } from '@/components/ui/badge';
import CommonSelect from '@/components/common-select';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import MySalesHistoryCard, {
  type SalesStatus,
} from '@/routes/mypage/_components/mySales/MySalesHistoryCard';
import { LucideBadgeDollarSign, LucideInfo } from 'lucide-react';
import { useGetMyAuctionList } from '@/api/my';
import { useState } from 'react';

export default function MySalesTab() {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);

  const searchOptions = [
    { value: '5', label: '5개씩 보기' },
    { value: '10', label: '10개씩 보기' },
    { value: '15', label: '15개씩 보기' },
    { value: '20', label: '20개씩 보기' },
  ];

  const { data: mySales } = useGetMyAuctionList({
    page,
    size,
  });

  const handleSizeChange = (value: string) => {
    setSize(Number(value));
    setPage(0);
  };

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between items-center w-full border-b border-gray-500 pb-4'>
        <div className='flex items-center gap-2'>
          <LucideBadgeDollarSign className='w-6 h-6' />
          <span className='text-2xl font-bold'>내 판매 내역</span>
        </div>
        <div className='flex items-center gap-2'>
          <CommonSelect
            label='보기 조건'
            options={searchOptions}
            defaultValue={String(size)}
            onValueChange={handleSizeChange}
          />
          <Badge variant={'secondary'}>
            총 {mySales?.totalElements ?? 0}건
          </Badge>
        </div>
      </div>

      {mySales && mySales.content.length > 0 ? (
        <>
          <div className='flex flex-col gap-6'>
            {mySales.content.map(sale => (
              <MySalesHistoryCard
                key={sale.auctionId}
                status={sale.status as SalesStatus}
                auctionId={sale.auctionId}
                salesData={sale}
              />
            ))}
          </div>

          {mySales.totalPages > 1 && (
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
                {[...Array(mySales.totalPages)].map((_, i) => (
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
                        Math.min(mySales.totalPages - 1, prev + 1)
                      );
                    }}
                    className={
                      page === mySales.totalPages - 1
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
            판매 내역이 없습니다.
          </p>
          <p className='text-sm text-gray-500'>
            상품을 등록하고 판매를 시작해보세요!
          </p>
        </div>
      )}
    </div>
  );
}
