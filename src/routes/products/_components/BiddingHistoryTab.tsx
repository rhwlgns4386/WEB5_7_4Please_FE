import BiddingHistoryCard from '@/routes/products/_components/BiddingHistoryCard';

export default function BiddingHistoryTab() {
  return (
    <div>
      <div className='flex flex-col gap-2 w-full border-b border-foreground/50 pb-2'>
        <h1 className='text-2xl font-bold'>실시간입찰 내역</h1>
        <span className='text-sm text-gray-500'>총 25회 입찰</span>
      </div>
      <div className='flex flex-col gap-2 overflow-y-auto mt-2 h-[480px] p-4'>
        {Array.from({ length: 25 }).map((_, index) => {
          return <BiddingHistoryCard key={index} />;
        })}
      </div>
    </div>
  );
}
