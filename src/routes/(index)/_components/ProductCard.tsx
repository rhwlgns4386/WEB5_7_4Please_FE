import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart } from 'lucide-react';
import { useState } from 'react';
import ProductImagePlaceholder from './ProductImagePlaceholder';
import type { AuctionItem } from '@/types';
import { useCountdown } from '@/hooks/useCountdown';
import { useNavigate } from '@tanstack/react-router';

interface ProductCardProps {
  product: AuctionItem;
  theme?: 'light' | 'dark';
  onHeartClick?: (productId: number) => void;
}

const getCategoryBadgeColor = (category: string, isDark: boolean) => {
  const colors = {
    패션: isDark
      ? 'bg-pink-500/20 text-pink-300 border-pink-400/30'
      : 'bg-pink-100 text-pink-700 border-pink-300',
    전자제품: isDark
      ? 'bg-blue-500/20 text-blue-300 border-blue-400/30'
      : 'bg-blue-100 text-blue-700 border-blue-300',
    스포츠: isDark
      ? 'bg-green-500/20 text-green-300 border-green-400/30'
      : 'bg-green-100 text-green-700 border-green-300',
    가구: isDark
      ? 'bg-amber-500/20 text-amber-300 border-amber-400/30'
      : 'bg-amber-100 text-amber-700 border-amber-300',
    생활용품: isDark
      ? 'bg-purple-500/20 text-purple-300 border-purple-400/30'
      : 'bg-purple-100 text-purple-700 border-purple-300',
    기타: isDark
      ? 'bg-gray-500/20 text-gray-300 border-gray-400/30'
      : 'bg-gray-100 text-gray-700 border-gray-300',
  };

  return colors[category as keyof typeof colors] || colors['기타'];
};

export default function ProductCard({
  product,
  theme = 'light',
  onHeartClick,
}: ProductCardProps) {
  const isDark = theme === 'dark';
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const timeLeft = useCountdown(product.endTime);
  const navigate = useNavigate();

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    <Card
      onClick={() => navigate({ to: `/products/${product.auctionId}` })}
      className={`w-full h-auto cursor-pointer overflow-hidden border shadow-sm hover:shadow-md transition-shadow ${
        isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
      }`}
    >
      <div className='aspect-square relative overflow-hidden group'>
        {imageError ? (
          <ProductImagePlaceholder
            category={product.category.name}
            isDark={isDark}
          />
        ) : (
          <>
            {imageLoading && (
              <div
                className={`absolute inset-0 flex items-center justify-center ${
                  isDark ? 'bg-gray-700' : 'bg-gray-200'
                }`}
              >
                <div
                  className={`animate-pulse text-sm ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  로딩중...
                </div>
              </div>
            )}
            <img
              src={product.thumbnailUrl}
              alt={product.name}
              className='w-full h-full object-cover'
              onError={handleImageError}
              onLoad={handleImageLoad}
              style={{ display: imageLoading ? 'none' : 'block' }}
            />
          </>
        )}
        <button
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all duration-200 shadow-sm ${
            isDark
              ? 'bg-gray-900/80 hover:bg-gray-900/90 border border-gray-600'
              : 'bg-white/80 hover:bg-white/90'
          }`}
          onClick={e => {
            e.stopPropagation();
            onHeartClick?.(product.auctionId);
          }}
        >
          <Heart
            size={16}
            className={`transition-colors duration-200 ${
              product.isWishlist
                ? isDark
                  ? 'fill-red-400 text-red-400'
                  : 'fill-red-500 text-red-500'
                : isDark
                  ? 'text-gray-300 hover:text-red-400'
                  : 'text-gray-600 hover:text-red-500'
            }`}
          />
        </button>
      </div>
      <CardContent className='p-4 space-y-2'>
        <div className='mb-1'>
          <Badge
            variant='outline'
            className={`text-xs font-medium ${getCategoryBadgeColor(product.category.name, isDark)}`}
          >
            {product.category.name}
          </Badge>
        </div>
        <h3
          className={`text-sm font-semibold line-clamp-2 min-h-[2.5rem] ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}
        >
          {product.name}
        </h3>
        <div className='flex items-center gap-1'>
          <span
            className={`text-lg font-bold ${
              isDark ? 'text-orange-400' : 'text-orange-500'
            }`}
          >
            {product.instantPrice ? (
              <span className='text-sm'>
                <span className='text-gray-500 mr-2 text-xs'>즉시구매가</span>
                <span className='text-lg font-bold'>
                  {product.instantPrice.toLocaleString()}
                </span>
              </span>
            ) : (
              product.maxPrice.toLocaleString()
            )}
          </span>
          <span
            className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
          >
            원
          </span>
        </div>
        <div
          className={`flex items-center justify-between text-xs ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}
        >
          <span>⏰ {timeLeft}</span>
          <span>{product.bidCount}명 입찰</span>
        </div>
      </CardContent>
    </Card>
  );
}
