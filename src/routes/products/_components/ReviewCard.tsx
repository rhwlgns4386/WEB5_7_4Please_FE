import { LucideStar } from 'lucide-react';

export default function ReviewCard() {
  return (
    <div className='flex justify-between items-center bg-accent p-4 rounded-lg'>
      <div className='flex gap-4 items-center'>
        <span className='text-lg font-bold'>김구매</span>
        <div className='flex gap-2 flex-col'>
          <div className='flex gap-1'>
            <LucideStar className='text-amber-300 fill-amber-300' size={20} />
            <LucideStar className='text-amber-300 fill-amber-300' size={20} />
            <LucideStar className='text-amber-300 fill-amber-300' size={20} />
            <LucideStar className='text-amber-300 fill-amber-300' size={20} />
            <LucideStar className='text-amber-300 fill-amber-300' size={20} />
          </div>
          <span>배송도 빠르고, 상품도 정확합니다.</span>
        </div>
      </div>
      <span>2025-07-09</span>
    </div>
  );
}
