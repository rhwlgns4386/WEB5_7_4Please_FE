import { useState } from 'react';
import { LucideStar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  maxRating?: number;
  value?: number;
  onChange?: (rating: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function StarRating({
  maxRating = 5,
  value = 0,
  onChange,
  readonly = false,
  size = 'md',
  className,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const starSize = sizeClasses[size];

  const handleMouseEnter = (starIndex: number, isHalf: boolean) => {
    if (readonly) return;
    const rating = starIndex + (isHalf ? 0.5 : 1);
    setHoverRating(rating);
  };

  const handleMouseLeave = () => {
    if (readonly) return;
    setHoverRating(null);
  };

  const handleClick = (starIndex: number, isHalf: boolean) => {
    if (readonly || !onChange) return;
    const rating = starIndex + (isHalf ? 0.5 : 1);
    onChange(rating);
  };

  const getStarFillType = (starIndex: number): 'empty' | 'half' | 'full' => {
    const currentRating = hoverRating !== null ? hoverRating : value;

    if (currentRating >= starIndex + 1) {
      return 'full';
    } else if (currentRating >= starIndex + 0.5) {
      return 'half';
    } else {
      return 'empty';
    }
  };

  return (
    <div
      className={cn('flex gap-1', className)}
      onMouseLeave={handleMouseLeave}
    >
      {Array.from({ length: maxRating }, (_, starIndex) => {
        const fillType = getStarFillType(starIndex);

        return (
          <div
            key={starIndex}
            className={cn('relative', !readonly && 'cursor-pointer', starSize)}
          >
            {/* 빈 별 (배경) */}
            <LucideStar
              className={cn('absolute inset-0 text-gray-300', starSize)}
              fill='transparent'
              stroke='currentColor'
            />

            {/* 반 별 (왼쪽 절반) */}
            {fillType === 'half' && (
              <div
                className={cn('absolute inset-0 overflow-hidden', starSize)}
                style={{ clipPath: 'inset(0 50% 0 0)' }}
              >
                <LucideStar
                  className={cn('text-yellow-400', starSize)}
                  fill='currentColor'
                  stroke='currentColor'
                />
              </div>
            )}

            {/* 전체 별 */}
            {fillType === 'full' && (
              <LucideStar
                className={cn('absolute inset-0 text-yellow-400', starSize)}
                fill='currentColor'
                stroke='currentColor'
              />
            )}

            {/* 호버 영역 - 왼쪽 절반 (0.5점) */}
            {!readonly && (
              <div
                className='absolute inset-0 w-1/2 z-10'
                onMouseEnter={() => handleMouseEnter(starIndex, true)}
                onClick={() => handleClick(starIndex, true)}
              />
            )}

            {/* 호버 영역 - 오른쪽 절반 (1점) */}
            {!readonly && (
              <div
                className='absolute inset-0 left-1/2 w-1/2 z-10'
                onMouseEnter={() => handleMouseEnter(starIndex, false)}
                onClick={() => handleClick(starIndex, false)}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
