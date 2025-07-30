import BiddingHistoryCard from '@/routes/products/_components/BiddingHistoryCard';
import type { Bid } from '@/types';
interface BiddingHistoryTabProps {
  bids: Bid[];
  totalBids: number;
}

export default function BiddingHistoryTab({
  bids,
  totalBids,
}: BiddingHistoryTabProps) {
  return (
    <div>
      <div className='flex flex-col gap-2 w-full border-b border-foreground/50 pb-2'>
        <h1 className='text-2xl font-bold'>실시간 입찰 내역</h1>
        <span className='text-sm text-gray-500'>총 {totalBids}회 입찰</span>
      </div>
      <div className='flex flex-col gap-2 overflow-y-auto mt-2 h-[480px] p-4'>
        {bids.map((bid, index) => (
          <BiddingHistoryCard
            key={bid.bidId}
            bid={bid}
            isHighestBid={index === 0}
          />
        ))}
      </div>
    </div>
  );
}
