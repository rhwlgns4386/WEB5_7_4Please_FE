import { useCreateBid } from '@/api/bid';
import { useCreateOrder } from '@/api/order';
import BiddingCancelConfirmModal from '@/components/bidding-cancel-confirm-modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCountdown } from '@/hooks/useCountdown';
import BiddingPriceConfirmModal from '@/routes/products/_components/modals/BiddingPriceConfirmModal';
import type { OrderInfo, ProductDetail } from '@/types';
import { useParams } from '@tanstack/react-router';
import {
  LucideActivity,
  LucideAlertCircle,
  LucideClock,
  LucideHammer,
  LucideTimerOff,
  LucideZap,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import PaymentModal from '@/components/payment-modal.tsx';

type Status =
  | 'hasImmediatePaymentSeller'
  | 'default'
  | 'withoutImmediatePaymentSeller'
  | 'hasImmediatePaymentBuyer'
  | 'biddingEnded';

type ModalMode = 'bid' | 'buyNow';

interface BiddingFormProps {
  productDetail: ProductDetail;
}

interface ContentComponentProps {
  productDetail: ProductDetail;
  bidPrice: number;
  setBidPrice: (value: number) => void;
  setIsBiddingPriceConfirmModalOpen: (value: boolean) => void;
  setModalMode: (value: ModalMode) => void;
  handleCreateInstantOrder: () => void;
  id: string;
}

const contentsMapping = {
  hasImmediatePaymentSeller: ({ productDetail, id }: ContentComponentProps) => {
    return (
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-4 items-center justify-center rounded-lg bg-white p-5'>
          <span className='text-sm text-gray-400'>현재 최고 입찰가</span>
          <span className='text-2xl font-bold text-orange-500'>
            {productDetail?.highestBidPrice
              ? `${productDetail.highestBidPrice.toLocaleString()}원`
              : '-'}
          </span>
          <span className='text-sm text-gray-400'>
            시작가:{' '}
            {productDetail?.startingPrice
              ? `${productDetail.startingPrice.toLocaleString()}원`
              : '-'}{' '}
            | 입찰 {productDetail?.bidCount}회
          </span>
        </div>
        <div className='flex flex-col gap-4 items-center justify-center rounded-lg bg-white p-5'>
          <span className='text-sm text-gray-400'>즉시 입찰가</span>
          <span className='text-2xl font-bold text-orange-500'>
            {productDetail?.instantBidPrice
              ? `${productDetail.instantBidPrice.toLocaleString()}원`
              : '-'}
          </span>
        </div>
        <BiddingCancelConfirmModal auctionId={Number(id)} />
      </div>
    );
  },
  default: ({
              productDetail,
              bidPrice,
              setBidPrice,
              setIsBiddingPriceConfirmModalOpen,
              setModalMode,
            }: ContentComponentProps) => {
    return (
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-4 items-center justify-center rounded-lg bg-white p-5'>
          <span className='text-sm text-gray-400'>현재 최고 입찰가</span>
          <span className='text-2xl font-bold text-orange-500'>
            {productDetail?.highestBidPrice
              ? `${productDetail.highestBidPrice.toLocaleString()}원`
              : '-'}
          </span>
          <span className='text-sm text-gray-400'>
            시작가:{' '}
            {productDetail?.startingPrice
              ? `${productDetail.startingPrice.toLocaleString()}원`
              : '-'}{' '}
            | 입찰 {productDetail?.bidCount}회
          </span>
        </div>
        <div className='flex flex-col gap-2 mt-5'>
          <span className='text-sm text-gray-400'>입찰금액</span>
          <Input
            placeholder='입찰 금액을 입력해주세요.'
            className='w-full'
            type='number'
            inputMode='numeric'
            value={bidPrice || ''}
            onChange={e => setBidPrice(Number(e.target.value))}
          />
          <Button
            className='w-full bg-orange-500 hover:bg-orange-700 text-gray-50 font-bold'
            size={'lg'}
            variant={'default'}
            disabled={!bidPrice}
            onClick={() => {
              setModalMode('bid');
              setIsBiddingPriceConfirmModalOpen(true);
            }}
          >
            <LucideHammer className='w-4 h-4' />
            입찰하기
          </Button>
        </div>
      </div>
    );
  },
  withoutImmediatePaymentSeller: ({
                                    productDetail,
                                    id,
                                  }: ContentComponentProps) => {
    return (
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-4 items-center justify-center rounded-lg bg-white p-5'>
          <span className='text-sm text-gray-400'>현재 최고 입찰가</span>
          <span className='text-2xl font-bold text-orange-500'>
            {productDetail?.highestBidPrice
              ? `${productDetail.highestBidPrice.toLocaleString()}원`
              : '-'}
          </span>
          <span className='text-sm text-gray-400'>
            시작가:{' '}
            {productDetail?.startingPrice
              ? `${productDetail.startingPrice.toLocaleString()}원`
              : '-'}{' '}
            | 입찰 {productDetail?.bidCount}회
          </span>
        </div>
        <BiddingCancelConfirmModal auctionId={Number(id)} />
      </div>
    );
  },
  hasImmediatePaymentBuyer: ({
                               productDetail,
                               bidPrice,
                               setBidPrice,
                               setIsBiddingPriceConfirmModalOpen,
                               setModalMode,
                               handleCreateInstantOrder,
                             }: ContentComponentProps) => {
    return (
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-4 items-center justify-center rounded-lg bg-white p-5'>
          <span className='text-sm text-gray-400'>현재 최고 입찰가</span>
          <span className='text-2xl font-bold text-orange-500'>
            {productDetail?.highestBidPrice
              ? `${productDetail.highestBidPrice.toLocaleString()}원`
              : '-'}
          </span>
          <span className='text-sm text-gray-400'>
            시작가:{' '}
            {productDetail?.startingPrice
              ? `${productDetail.startingPrice.toLocaleString()}원`
              : '-'}{' '}
            | 입찰 {productDetail?.bidCount}회
          </span>
        </div>
        <div className='flex flex-col gap-4 items-center justify-center rounded-lg bg-white p-5'>
          <span className='text-sm text-gray-400'>즉시 입찰가</span>
          <span className='text-2xl font-bold text-orange-500'>
            {productDetail?.instantBidPrice
              ? `${productDetail.instantBidPrice.toLocaleString()}원`
              : '-'}
          </span>
        </div>
        <div className='flex flex-col gap-2 mt-5'>
          <span className='text-sm text-gray-400'>입찰금액</span>
          <Input
            placeholder='입찰 금액을 입력해주세요.'
            className='w-full'
            type='number'
            inputMode='numeric'
            value={bidPrice || ''}
            onChange={e => setBidPrice(Number(e.target.value))}
          />
          <Button
            className='w-full bg-gray-700 hover:bg-gray-900 text-gray-50 font-bold'
            size={'lg'}
            variant={'secondary'}
            disabled={!bidPrice}
            onClick={() => {
              setModalMode('bid');
              setIsBiddingPriceConfirmModalOpen(true);
            }}
          >
            <LucideActivity className='w-4 h-4' />
            입찰하기
          </Button>
          <Button
            className='w-full bg-orange-500 hover:bg-orange-700 text-gray-50 font-bold'
            size={'lg'}
            variant={'default'}
            onClick={handleCreateInstantOrder}
          >
            <LucideZap className='w-4 h-4' fill='white' />
            즉시 입찰가로 구매하기
          </Button>
        </div>
      </div>
    );
  },
  biddingEnded: ({ productDetail }: ContentComponentProps) => {
    return (
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-4 items-center justify-center rounded-lg bg-white p-5'>
          <span className='text-xl text-gray-400'>낙찰 금액</span>
          <span className='text-3xl font-bold text-orange-500'>
            {productDetail?.highestBidPrice
              ? `${productDetail.highestBidPrice.toLocaleString()}원`
              : '-'}
          </span>
          <span className='text-sm text-gray-400'>
            시작가:{' '}
            {productDetail?.startingPrice
              ? `${productDetail.startingPrice.toLocaleString()}원`
              : '-'}{' '}
            | 입찰 {productDetail?.bidCount}회
          </span>
        </div>
        <div className='bg-red-500 text-white flex items-center gap-2 p-4 rounded-lg justify-center'>
          <LucideTimerOff className='w-4 h-4' /> 종료된 경매입니다.
        </div>
      </div>
    );
  },
};

export default function BiddingForm({ productDetail }: BiddingFormProps) {
  const [isBiddingPriceConfirmModalOpen, setIsBiddingPriceConfirmModalOpen] =
    useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>('bid');
  const [status, _setStatus] = useState<Status>('hasImmediatePaymentBuyer');
  const [bidPrice, setBidPrice] = useState(0);
  const { id } = useParams({ from: '/products/$id' });
  const timeLeft = useCountdown(productDetail.endTime);
  const { mutate: createBid } = useCreateBid();
  const { mutate: createOrder } = useCreateOrder();
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);
  const [isOpenOrderModal, setIsOpenOrderModal] = useState(false);

  const handleCreateBid = () => {
    if (bidPrice <= productDetail.highestBidPrice) {
      toast.error('입찰 금액이 현재 최고 입찰가보다 낮습니다.');
      return;
    }

    createBid(
      {
        auctionId: Number(id),
        price: bidPrice,
      },
      {
        onSuccess: () => {
          setBidPrice(0);
          setIsBiddingPriceConfirmModalOpen(false);
          toast.success('입찰이 완료되었습니다.');
        },
      }
    );
  };

  const handleCreateInstantOrder = () => {
    const newOrderInfo: OrderInfo = {
      productName: productDetail.productName,
      amount: productDetail.instantBidPrice,
      type: 'BUY_NOW',
      auctionId: id,
      thumbnailUrl: productDetail.thumbnailUrl,
      sellerNickName:'test'
    };

    setOrderInfo(newOrderInfo);
    setIsOpenOrderModal(true);
  };

  const Contents = contentsMapping[status];

  return (
    <div className='bg-gray-700/50 rounded-lg p-5 border border-gray-500 sticky top-[80px]'>
      <div className='flex flex-col gap-2'>
        <Badge variant={'outline'} className='bg-blue-500/30'>
          {productDetail.categoryName}
        </Badge>
        <div className='flex w-full justify-between items-center'>
          <span className='text-2xl font-bold'>
            {productDetail.productName}
          </span>
          <Badge variant={'destructive'}>
            <LucideClock />
            {timeLeft}
          </Badge>
        </div>

        <Contents
          productDetail={productDetail}
          bidPrice={bidPrice}
          setBidPrice={setBidPrice}
          setIsBiddingPriceConfirmModalOpen={setIsBiddingPriceConfirmModalOpen}
          setModalMode={setModalMode}
          handleCreateInstantOrder={handleCreateInstantOrder}
          id={id}
        />
      </div>

      <div className='flex items-center gap-2 text-sm text-gray-400 mt-5 border-t border-gray-500 pt-5'>
        <LucideAlertCircle className='w-4 h-4' />
        <span>신중하게 입찰해 주세요.</span>
      </div>

      <BiddingPriceConfirmModal
        isOpen={isBiddingPriceConfirmModalOpen}
        onClose={() => setIsBiddingPriceConfirmModalOpen(false)}
        onSubmit={
          modalMode === 'bid' ? handleCreateBid : handleCreateInstantOrder
        }
        bidPrice={
          modalMode === 'bid' ? bidPrice : productDetail.instantBidPrice
        }
      />

      {orderInfo && (
        <PaymentModal
          orderInfo={orderInfo}
          isOpen={isOpenOrderModal}
          onClose={() => {
            setIsOpenOrderModal(false);
            setOrderInfo(null);
          }}
        />
      )}
    </div>
  );
}