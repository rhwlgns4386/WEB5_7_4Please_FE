import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { LucideChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { useNavigate } from '@tanstack/react-router';
import useWishlist from '@/routes/(index)/hooks/useWishlist';
import useProductList from '@/routes/(index)/hooks/useProductList';
import type { AuctionItem } from '@/types';

export default function HotProductsSection() {
  const navigate = useNavigate();
  const { registerWishList } = useWishlist();
  const { data: productsData } = useProductList();

  const handleHeartClick = (auctionId: number) => {
    registerWishList({ auctionId });
  };

  const seeAllProducts = () => {
    navigate({
      to: '/products',
      search: { sort: 'bids', category: 'all', query: '', page: 1 },
    });
  };

  return (
    <div className='py-10 px-6 bg-gray-800/50'>
      <div className='flex gap-4 flex-col'>
        <div className='flex justify-between items-center'>
          <span className='text-2xl font-bold text-white'>🔥인기 상품</span>
          <div className='flex items-center'>
            <Button
              variant='ghost'
              className='cursor-pointer text-white hover:text-gray-300'
              onClick={seeAllProducts}
            >
              전체보기 <LucideChevronRight />
            </Button>
          </div>
        </div>
        <div className='relative px-12'>
          <Carousel
            opts={{
              align: 'start',
              slidesToScroll: 1,
            }}
            className='w-full'
          >
            <CarouselContent className='-ml-2 md:-ml-4'>
              {productsData?.data?.content?.map((product: AuctionItem) => (
                <CarouselItem
                  key={product.auctionId}
                  className='pl-2 md:pl-4 basis-[280px] sm:basis-[300px] md:basis-[320px] lg:basis-[350px]'
                >
                  <ProductCard
                    product={product}
                    theme='dark'
                    onHeartClick={handleHeartClick}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className='hidden sm:flex absolute -left-10 top-1/2 -translate-y-1/2 z-10 border-gray-600 text-white hover:bg-gray-700' />
            <CarouselNext className='hidden sm:flex absolute -right-10 top-1/2 -translate-y-1/2 z-10 border-gray-600 text-white hover:bg-gray-700' />
          </Carousel>
        </div>
      </div>
    </div>
  );
}
