import { useDeleteWishList } from '@/api/wishlist';
import { Button } from '@/components/ui/button';
import type { WishListContent } from '@/types';
import { useNavigate } from '@tanstack/react-router';
import { LucideHeart } from 'lucide-react';

export default function MyFavoriteCard({
  wishlist,
}: {
  wishlist: WishListContent;
}) {
  const { mutate: deleteWishList } = useDeleteWishList();

  const navigate = useNavigate();
  const handleClickWishList = () => {
    navigate({
      to: '/products/$id',
      params: { id: wishlist.auctionId.toString() },
    });
  };

  return (
    <div
      className='relative cursor-pointer bg-gradient-to-br from-gray-800/80 to-gray-700/60 rounded-2xl px-6 py-5 flex gap-6 items-center w-full shadow-lg border border-gray-700 hover:shadow-2xl transition-shadow duration-200'
      onClick={handleClickWishList}
    >
      <div className='w-[100px] h-[100px] rounded-xl overflow-hidden shrink-0 border-2 border-gray-600 shadow-md'>
        <img
          src={wishlist.thumbnailUrl}
          alt='favorite-image'
          className='w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-200'
        />
      </div>
      <div className='flex flex-col justify-between w-full h-full gap-3'>
        <div className='flex justify-between items-center w-full mb-2'>
          <span className='font-semibold text-lg text-white truncate max-w-[160px]'>
            {wishlist.name}
          </span>
          <Button
            onClick={() => deleteWishList({ auctionId: wishlist.auctionId })}
            variant={'outline'}
            className='text-white px-4 py-1 rounded-lg text-sm shadow-sm transition-colors duration-150'
          >
            <LucideHeart fill='red' stroke='red' />
            관심해제
          </Button>
        </div>
        <div className='w-full h-px bg-gray-600/40 my-1' />
        <div className='flex items-center w-full mt-1 relative'>
          <div className='flex flex-col gap-1 items-start'>
            <span className='text-xs text-gray-300'>현재 최고가</span>
            <span className='font-bold text-base text-green-400 drop-shadow'>
              {wishlist.maxPrice.toLocaleString()}원
            </span>
          </div>
          <div className='flex flex-col gap-1 items-center mx-auto absolute left-1/2 -translate-x-1/2'>
            <span className='text-xs text-gray-300'>입찰 수</span>
            <span className='font-bold text-base text-blue-400 drop-shadow'>
              {wishlist.bidCount}회
            </span>
          </div>
        </div>
      </div>
      <div className='absolute inset-0 rounded-2xl pointer-events-none border border-white/5' />
    </div>
  );
}
