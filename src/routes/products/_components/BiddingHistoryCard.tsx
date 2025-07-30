import { useDeleteBid } from '@/api/bid';
import { Badge } from '@/components/ui/badge';
import { useUserStore } from '@/store/user';
import type { Bid } from '@/types';
import dayjs from 'dayjs';

interface BiddingHistoryCardProps {
  bid: Bid;
  isHighestBid: boolean;
}

export default function BiddingHistoryCard({
  bid,
  isHighestBid,
}: BiddingHistoryCardProps) {
  const { mutate: deleteBid } = useDeleteBid();
  const nickname = useUserStore(state => state.nickname);

  const isMyBid = nickname === bid.bidderName;

  // 최고가(isHighestBid)는 녹색, 내 입찰(isMyBid)은 파란색, 그 외에는 기본 배경색을 적용합니다.
  // 최고가이면서 내 입찰인 경우 녹색이 우선 적용됩니다.
  const bgColor = isHighestBid
    ? 'bg-green-700/50'
    : isMyBid
      ? 'bg-blue-700/50'
      : 'bg-accent';

  return (
    <div className='flex flex-col gap-2'>
      <div
        className={`flex w-full justify-between px-6 py-4 rounded-lg ${bgColor}`}
      >
        <div className='flex flex-col gap-2 '>
          <span className='text-sm text-gray-200'>{bid.bidderName}</span>
          <span className='text-sm text-gray-400'>
            {dayjs(bid.bidTime).format('YYYY-MM-DD HH:mm:ss')}
          </span>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='flex gap-1 items-center w-full justify-end'>
            <span className='text-lg font-bold text-orange-500'>
              {bid.bidPrice.toLocaleString()}
            </span>
            <span className='text-sm text-gray-200'>원</span>
          </div>
          <div className='flex gap-2 justify-end'>
            {isHighestBid && (
              <Badge
                variant={'default'}
                className='bg-cyan-700 text-white border border-foreground/50'
              >
                최고가
              </Badge>
            )}

            {isMyBid && (
              <Badge
                variant={'secondary'}
                className='border border-foreground/50 bg-green-700 text-white'
              >
                내 입찰
              </Badge>
            )}
            {isMyBid && (
              <Badge
                variant={'destructive'}
                className='border border-foreground/50 cursor-pointer'
                onClick={() => deleteBid({ bidId: bid.bidId })}
              >
                취소
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
