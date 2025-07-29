import { Button } from '@/components/ui/button';
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
import { usePagination } from '@/hooks/usePagination';
import { LucideBadgeDollarSign } from 'lucide-react';
import { useGetMyAuctionList } from '@/api/my';

export default function MySalesTab() {
  const {
    currentPage,
    totalPages,
    goToPage,
    nextPage,
    prevPage,
    canGoNext,
    canGoPrev,
  } = usePagination();

  const { data: mySales } = useGetMyAuctionList({
    page: currentPage,
    size: 5,
  });

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between items-center w-full border-b border-gray-500 pb-4'>
        <div className='flex items-center gap-2'>
          <LucideBadgeDollarSign className='w-6 h-6' />
          <span className='text-2xl font-bold'>내 판매 내역</span>
        </div>
        <div className='flex items-center gap-2'>
          <span className='text-sm text-gray-400'>
            총 {mySales?.totalElements ?? 0}건
          </span>
        </div>
      </div>
      <div className='flex flex-col gap-6'>
        {mySales?.content?.map(sale => (
          <MySalesHistoryCard
            key={sale.auctionId}
            status={sale.status as SalesStatus}
            auctionId={sale.auctionId}
            salesData={sale}
          />
        ))}
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Button
              variant={'ghost'}
              onClick={prevPage}
              disabled={!canGoPrev}
              className='hover:bg-gray-700'
            >
              <PaginationPrevious />
            </Button>
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationItem key={i}>
              <Button
                variant={currentPage === i ? 'default' : 'ghost'}
                onClick={() => goToPage(i)}
                className='hover:bg-gray-700'
              >
                <PaginationLink>{i + 1}</PaginationLink>
              </Button>
            </PaginationItem>
          ))}
          <PaginationItem>
            <Button
              variant={'ghost'}
              onClick={nextPage}
              disabled={!canGoNext}
              className='hover:bg-gray-700'
            >
              <PaginationNext />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
