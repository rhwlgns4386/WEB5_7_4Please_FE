import BiddingCancelConfirmModal from '@/components/bidding-cancel-confirm-modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import BiddingPriceConfirmModal from '@/routes/products/_components/modals/BiddingPriceConfirmModal';
import type { ProductDetail } from '@/types';
import {
  LucideActivity,
  LucideAlertCircle,
  LucideHammer,
  LucideTimerOff,
  LucideZap,
} from 'lucide-react';
import { useState } from 'react';

type Status =
  | 'hasImmediatePaymentSeller'
  | 'default'
  | 'withoutImmediatePaymentSeller'
  | 'hasImmediatePaymentBuyer'
  | 'biddingEnded';

interface BiddingFormProps {
  productDetail: ProductDetail;
}

export default function BiddingForm({ productDetail }: BiddingFormProps) {
  const [isBiddingPriceConfirmModalOpen, setIsBiddingPriceConfirmModalOpen] =
    useState(false);
  const [status, _setStatus] = useState<Status>(
    'withoutImmediatePaymentSeller'
  );

  const contentsMapping = {
    hasImmediatePaymentSeller: () => {
      return (
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-4 items-center justify-center rounded-lg bg-white p-5'>
            <span className='text-sm text-gray-400'>현재 최고 입찰가</span>
            <span className='text-2xl font-bold text-orange-500'>
              {productDetail.highestBidPrice.toLocaleString()}원
            </span>
            <span className='text-sm text-gray-400'>
              시작가:{productDetail.startingPrice.toLocaleString()}원 | 입찰
              {productDetail.bidCount}회
            </span>
          </div>
          <div className='flex flex-col gap-4 items-center justify-center rounded-lg bg-white p-5'>
            <span className='text-sm text-gray-400'>즉시 입찰가</span>
            <span className='text-2xl font-bold text-orange-500'>
              {productDetail.instantBidPrice.toLocaleString()}원
            </span>
          </div>
          <BiddingCancelConfirmModal auctionId={productDetail.auctionId} />
        </div>
      );
    },
    default: () => {
      return (
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-4 items-center justify-center rounded-lg bg-white p-5'>
            <span className='text-sm text-gray-400'>현재 최고 입찰가</span>
            <span className='text-2xl font-bold text-orange-500'>
              {productDetail.highestBidPrice.toLocaleString()}원
            </span>
            <span className='text-sm text-gray-400'>
              시작가:{productDetail.startingPrice.toLocaleString()}원 | 입찰
              {productDetail.bidCount}회
            </span>
          </div>
          <div className='flex flex-col gap-2 mt-5'>
            <span className='text-sm text-gray-400'>입찰금액</span>
            <Input
              placeholder='입찰 금액을 입력해주세요.'
              className='w-full'
              type='number'
              inputMode='numeric'
            />
            <Button
              className='w-full bg-orange-500 hover:bg-orange-700 text-gray-50 font-bold'
              size={'lg'}
              variant={'default'}
              onClick={() => setIsBiddingPriceConfirmModalOpen(true)}
            >
              <LucideHammer className='w-4 h-4' />
              입찰하기
            </Button>
          </div>
        </div>
      );
    },
    withoutImmediatePaymentSeller: () => {
      return (
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-4 items-center justify-center rounded-lg bg-white p-5'>
            <span className='text-sm text-gray-400'>현재 최고 입찰가</span>
            <span className='text-2xl font-bold text-orange-500'>
              {productDetail.highestBidPrice.toLocaleString()}원
            </span>
            <span className='text-sm text-gray-400'>
              시작가:{productDetail.startingPrice.toLocaleString()}원 | 입찰
              {productDetail.bidCount}회
            </span>
          </div>
          <BiddingCancelConfirmModal auctionId={productDetail.auctionId} />
        </div>
      );
    },
    hasImmediatePaymentBuyer: () => {
      return (
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-4 items-center justify-center rounded-lg bg-white p-5'>
            <span className='text-sm text-gray-400'>현재 최고 입찰가</span>
            <span className='text-2xl font-bold text-orange-500'>
              {productDetail.highestBidPrice.toLocaleString()}원
            </span>
            <span className='text-sm text-gray-400'>
              시작가:{productDetail.startingPrice.toLocaleString()}원 | 입찰
              {productDetail.bidCount}회
            </span>
          </div>
          <div className='flex flex-col gap-4 items-center justify-center rounded-lg bg-white p-5'>
            <span className='text-sm text-gray-400'>즉시 입찰가</span>
            <span className='text-2xl font-bold text-orange-500'>
              {productDetail.instantBidPrice.toLocaleString()}원
            </span>
          </div>
          <div className='flex flex-col gap-2 mt-5'>
            <span className='text-sm text-gray-400'>입찰금액</span>
            <Input
              placeholder='입찰 금액을 입력해주세요.'
              className='w-full'
              type='number'
              inputMode='numeric'
            />
            <Button
              className='w-full bg-gray-700 hover:bg-gray-900 text-gray-50 font-bold'
              size={'lg'}
              variant={'secondary'}
              onClick={() => setIsBiddingPriceConfirmModalOpen(true)}
            >
              <LucideActivity className='w-4 h-4' />
              입찰하기
            </Button>
            <Button
              className='w-full bg-orange-500 hover:bg-orange-700 text-gray-50 font-bold'
              size={'lg'}
              variant={'default'}
              onClick={() => setIsBiddingPriceConfirmModalOpen(true)}
            >
              <LucideZap className='w-4 h-4' fill='white' />
              즉시 입찰가로 구매하기
            </Button>
          </div>
        </div>
      );
    },
    biddingEnded: () => {
      return (
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-4 items-center justify-center rounded-lg bg-white p-5'>
            <span className='text-xl text-gray-400'>낙찰 금액</span>
            <span className='text-3xl font-bold text-orange-500'>
              {productDetail.highestBidPrice.toLocaleString()}원
            </span>
            <span className='text-sm text-gray-400'>
              시작가:{productDetail.startingPrice.toLocaleString()}원 | 입찰
              {productDetail.bidCount}회
            </span>
          </div>
          <div className='bg-red-500 text-white flex items-center gap-2 p-4 rounded-lg justify-center'>
            <LucideTimerOff className='w-4 h-4' /> 종료된 경매입니다.
          </div>
        </div>
      );
    },
  };

  const Contents = contentsMapping[status];

  return (
    <div className='bg-gray-700/50 rounded-lg p-5 border border-gray-500 sticky top-[80px]'>
      <div className='flex flex-col gap-2'>
        <Badge variant={'outline'} className='bg-blue-500/30'>
          전자기기
        </Badge>
        <div className='flex w-full justify-between items-center'>
          <span className='text-2xl font-bold'>
            {productDetail.productName}
          </span>
          <Badge variant={'destructive'}>타이머</Badge>
        </div>

        <Contents />
      </div>
      <div className='flex items-center gap-2 text-sm text-gray-400 mt-5 border-t border-gray-500 pt-5'>
        <LucideAlertCircle className='w-4 h-4' />
        <span>신중하게 입찰해 주세요.</span>
      </div>
      <BiddingPriceConfirmModal
        isOpen={isBiddingPriceConfirmModalOpen}
        onClose={() => setIsBiddingPriceConfirmModalOpen(false)}
      />
    </div>
  );
}
