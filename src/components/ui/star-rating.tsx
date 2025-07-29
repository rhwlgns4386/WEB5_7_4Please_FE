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
  const displayRating = hoverRating ?? value;

  const handleClick = (ratingValue: number) => {
    if (readonly || !onChange) return;
    onChange(ratingValue);
  };

  const handleMouseEnter = (ratingValue: number) => {
    if (readonly) return;
    setHoverRating(ratingValue);
  };

  const handleMouseLeave = () => {
    if (readonly) return;
    setHoverRating(null);
  };

  return (
    <div
      className={cn('flex gap-1', className)}
      onMouseLeave={handleMouseLeave}
    >
      {Array.from({ length: maxRating }, (_, starIndex) => {
        const ratingValue = starIndex + 1;
        const isFilled = ratingValue <= displayRating;

        return (
          <LucideStar
            key={starIndex}
            className={cn(
              starSize,
              !readonly && 'cursor-pointer',
              isFilled ? 'text-yellow-400' : 'text-gray-300'
            )}
            fill={isFilled ? 'currentColor' : 'transparent'}
            stroke='currentColor'
            onMouseEnter={() => handleMouseEnter(ratingValue)}
            onClick={() => handleClick(ratingValue)}
          />
        );
      })}
    </div>
  );
}
