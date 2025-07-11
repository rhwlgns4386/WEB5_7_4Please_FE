import { Badge } from '@/components/ui/badge';

export default function BiddingHistoryCard() {
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex w-full justify-between bg-accent px-6 py-4 rounded-lg'>
        <div className='flex flex-col gap-2 '>
          <span className='text-sm text-gray-200'>구매자C #3</span>
          <span className='text-sm text-gray-400'>오전 09:13:22</span>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='flex gap-1 items-center'>
            <span className='text-lg font-bold text-orange-500'>900,000</span>
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
