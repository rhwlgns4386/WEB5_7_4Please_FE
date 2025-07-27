import { Badge } from '@/components/ui/badge';
import type { Bid } from '@/types';

interface BiddingHistoryCardProps {
  bid: Bid;
}

export default function BiddingHistoryCard({ bid }: BiddingHistoryCardProps) {
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex w-full justify-between bg-accent px-6 py-4 rounded-lg'>
        <div className='flex flex-col gap-2 '>
          <span className='text-sm text-gray-200'>{bid.bidderName}</span>
          <span className='text-sm text-gray-400'>{bid.bidTime}</span>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='flex gap-1 items-center'>
            <span className='text-lg font-bold text-orange-500'>
              {bid.bidPrice.toLocaleString()}
            </span>
            <span className='text-sm text-gray-200'>원</span>
          </div>
          <div className='flex gap-2'>
            <Badge
              variant={'default'}
              className='bg-cyan-700 text-white border border-foreground/50'
            >
              최고가
            </Badge>
            <Badge
              variant={'secondary'}
              className='border border-foreground/50'
            >
              내 입찰
            </Badge>
            <Badge
              variant={'destructive'}
              className='border border-foreground/50'
            >
              취소
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
