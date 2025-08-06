import { useGetSellerInfo } from '@/api/auction';
import { useGetReviews } from '@/api/review';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import ReviewCard from '@/routes/products/_components/ReviewCard';
import SalesHistoryModal from '@/routes/products/_components/modals/SalesHistoryModal';
import { useParams } from '@tanstack/react-router';
import { LucideChevronDown, LucideStar } from 'lucide-react';
import { useState } from 'react';

export default function SellerInfoTab() {
  const [isSalesHistoryModalOpen, setIsSalesHistoryModalOpen] = useState(false);
  const { id } = useParams({ from: '/products/$id' });
  const { data: sellerInfo, isLoading: isSellerInfoLoading } = useGetSellerInfo(
    { auctionId: Number(id) }
  );

  const {
    data: reviewsData,
    fetchNextPage,
    hasNextPage,
  } = useGetReviews({
    memberId: sellerInfo?.sellerId ?? 0,
    enabled: !isSellerInfoLoading && !!sellerInfo?.sellerId,
  });

  const reviews = reviewsData?.pages;

  return (
    <>
      <div>
        <div className='w-[350px]'>
          <div className='flex w-full justify-between items-center'>
            <div className='flex gap-2 items-center'>
              <Avatar className='w-16 h-16'>
                <AvatarImage src='https://github.com/shadcn.png' />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <span className='text-lg font-bold'>
                  {sellerInfo?.sellerNickname}
                </span>
                <div className='flex gap-1 items-center'>
                  <LucideStar
                    className='text-amber-300 fill-amber-300'
                    size={20}
                  />
                  <span className='text-lg font-bold'>
                    {sellerInfo?.averageRating}
                  </span>
                  <span className='text-sm text-gray-400'>
                    (리뷰{sellerInfo?.totalReviews}개)
                  </span>
                </div>
                <span className='text-sm text-gray-400'>
                  가입일:{sellerInfo?.createdAt.split('T')[0]}
                </span>
              </div>
            </div>
            <div
              className='flex flex-col items-center p-4 rounded-lg bg-accent gap-1 cursor-pointer'
              onClick={() => setIsSalesHistoryModalOpen(true)}
            >
              <span className='text-2xl font-bold'>
                {sellerInfo?.completedDeals}
              </span>
              <span className='text-sm text-gray-400'>판매 내역</span>
            </div>
          </div>
        </div>
        <Separator className='my-4' />
        <div className='flex flex-col gap-2'>
          <h1 className='text-2xl font-bold'>리뷰</h1>
          <div className='flex flex-col gap-2 overflow-auto h-[280px] p-2'>
            {reviews?.map(review => (
              <ReviewCard key={review.reviewId} review={review} />
            ))}
          </div>
          {hasNextPage && (
            <Button
              className='w-full'
              variant={'ghost'}
              size={'sm'}
              onClick={() => fetchNextPage()}
            >
              더보기
              <LucideChevronDown className='w-4 h-4' />
            </Button>
          )}
        </div>
      </div>
      <SalesHistoryModal
        sellerId={sellerInfo?.sellerId}
        isOpen={isSalesHistoryModalOpen}
        onClose={() => setIsSalesHistoryModalOpen(false)}
      />
    </>
  );
}
