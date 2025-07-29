import type { ReviewItem } from '@/types';
import { LucideStar } from 'lucide-react';

export default function ReviewCard({ review }: { review: ReviewItem }) {
  return (
    <div className='flex justify-between items-center bg-accent p-4 rounded-lg'>
      <div className='flex gap-4 items-center'>
        <span className='text-lg font-bold'>{review.nickName}</span>
        <div className='flex gap-2 flex-col'>
          <div className='flex gap-1'>
            {Array.from({ length: review.rating }).map((_, index) => (
              <LucideStar
                key={index}
                className='text-amber-300 fill-amber-300'
                size={20}
              />
            ))}
          </div>
          <span>{review.content}</span>
        </div>
      </div>
      <span>{review.reviewTime}</span>
    </div>
  );
}
