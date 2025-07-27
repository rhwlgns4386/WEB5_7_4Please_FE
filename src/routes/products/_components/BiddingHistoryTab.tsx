import { useGetBidList } from '@/api/bid';
import BiddingHistoryCard from '@/routes/products/_components/BiddingHistoryCard';
import { useParams } from '@tanstack/react-router';

export default function BiddingHistoryTab() {
  const { id } = useParams({ from: '/products/$id' });
  const { data: biddingHistory } = useGetBidList(Number(id), {
    page: 0,
    size: 10,
  });

  console.log(biddingHistory);
  return (
    <div>
      <div className='flex flex-col gap-2 w-full border-b border-foreground/50 pb-2'>
        <h1 className='text-2xl font-bold'>실시간입찰 내역</h1>
        <span className='text-sm text-gray-500'>
          총 {biddingHistory?.totalElements}회 입찰
        </span>
      </div>
      <div className='flex flex-col gap-2 overflow-y-auto mt-2 h-[480px] p-4'>
        {biddingHistory?.content.map(bid => {
          return <BiddingHistoryCard key={bid.bidId} bid={bid} />;
        })}
      </div>
    </div>
  );
}
