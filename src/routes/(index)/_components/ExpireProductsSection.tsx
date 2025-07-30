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
import type { AuctionItem } from '@/types';
import { useGetAuctionList } from '@/api/auction';
import { useCreateWishList } from '@/api/wishlist';

export default function ExpireProductsSection() {
  const navigate = useNavigate();
  const { mutate: createWishListMutation } = useCreateWishList();

  const { data: productsData } = useGetAuctionList({
    page: 0,
    size: 12,
    keyword: '',
    categoryId: undefined,
    order: 'timeout',
  });
  const products = productsData?.content;

  const handleHeartClick = (auctionId: number) => {
    createWishListMutation({ auctionId });
  };

  const seeAllProducts = () => {
    navigate({
      to: '/products',
      search: { sort: 'latest', category: 'all', query: '', page: 0 },
    });
  };

  return (
    <div className='py-10 px-6 bg-gradient-to-br from-gray-900 via-red-950/20 to-gray-900 border-l-4 border-red-500/70'>
      <div className='flex gap-4 flex-col'>
        <div className='flex justify-between items-center'>
          <span className='text-2xl font-bold text-white'>
            ⏰ 마감 임박 상품
          </span>
          <div className='flex items-center'>
            <Button
              variant='ghost'
              className='cursor-pointer text-gray-300 hover:text-red-400 hover:bg-gray-800'
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
              {products?.map((product: AuctionItem) => (
                <CarouselItem
                  key={product.auctionId}
                  className='pl-2 md:pl-4 basis-[280px] sm:basis-[300px] md:basis-[320px] lg:basis-[350px]'
                >
                  <ProductCard
                    product={product}
                    theme='dark'
                    onHeartClick={() => handleHeartClick(product.auctionId)}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className='hidden sm:flex absolute -left-10 top-1/2 -translate-y-1/2 z-10 border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-red-400' />
            <CarouselNext className='hidden sm:flex absolute -right-10 top-1/2 -translate-y-1/2 z-10 border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-red-400' />
          </Carousel>
        </div>
      </div>
    </div>
  );
}
