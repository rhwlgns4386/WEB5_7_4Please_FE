import { useUpdateShipment } from '@/api/shipment';
import PaymentModal from '@/components/payment-modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SellerReviewModal } from '@/routes/mypage/_components/SellerReviewModal';
import type { MyBid } from '@/types';
import { LucideAlertCircle, LucideIdCard, LucideTruck } from 'lucide-react';
import { useState } from 'react';

interface Props {
  bid: MyBid;
}

export default function BiddingHistoryCard({ bid }: Props) {
  const { mutate: updateShipment } = useUpdateShipment();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const bottomContentByStatusMapping = {
    OPEN: () => <></>,
    CLOSE: () => (
      <div className='p-4 border border-gray-500 rounded-lg flex flex-col gap-2 mt-4'>
        <div className='flex gap-1 items-center'>
          <span className='text-sm text-gray-500 font-bold'>최종 낙찰자:</span>
          <span className='text-sm text-white font-bold'>낙찰자닉네임</span>
        </div>
        <div className='flex gap-1 items-center'>
          <span className='text-sm text-gray-500 font-bold'>최종 낙찰가:</span>
          <span className='text-sm text-red-500 font-bold'>800,000원</span>
        </div>
      </div>
    ),
    FAIL: () => (
      <div className='flex gap-2 w-full items-center justify-end mt-4'>
        <div className='rounded-lg p-2 bg-gray-600/50'>
          <span className='text-sm text-white flex gap-2 items-center'>
            <LucideAlertCircle className='w-4 h-4' /> 판매자가 경매를
            취소했습니다.
          </span>
        </div>
      </div>
    ),
    PENDING: () => (
      <div className='flex gap-2 w-full items-center justify-end mt-4'>
        <Button variant={'outline'} onClick={() => setIsPaymentModalOpen(true)}>
          <LucideIdCard />
          결제하기
        </Button>
        <Button variant={'outline'}>낙찰 포기</Button>
      </div>
    ),
    SUCCESS: () => (
      <div className='flex gap-2 w-full items-center justify-end mt-4'>
        <div className='rounded-lg p-2 bg-gray-600/50'>
          <span className='text-sm text-white flex gap-2 items-center'>
            <LucideTruck className='w-4 h-4' /> 판매자의 배송을 기다리고
            있습니다.
          </span>
        </div>
      </div>
    ),
    REJECTED: () => (
      <div className='flex gap-2 w-full items-center justify-end mt-4'>
        <div className='rounded-lg p-2 bg-gray-600/50'>
          <span className='text-sm text-white flex gap-2 items-center'>
            <LucideAlertCircle className='w-4 h-4' /> 결제 시간 초과로 차상위
            입찰자에게 기회가 넘어갔습니다.
          </span>
        </div>
      </div>
    ),
    INTRANSIT: () => (
      <div className='flex gap-2 w-full items-end justify-between mt-4'>
        <span className='text-lg text-white font-bold'>
          운송장 번호: 12312312
        </span>
        <div className='flex gap-2'>
          <Button
            variant={'outline'}
            onClick={() => updateShipment({ auctionId: bid.auctionId })}
          >
            구매 확정
          </Button>
          <Button variant={'outline'}>반품 요청</Button>
        </div>
      </div>
    ),
    DELIVERED: () => (
      <div className='flex gap-2 w-full items-end justify-between mt-4'>
        <span className='text-lg text-white font-bold'>
          운송장 번호: 12312312
        </span>
        {/* <Button variant={'outline'}>리뷰 남기기</Button> */}
        <SellerReviewModal />
      </div>
    ),
  };

  const badgeByStatusMapping = {
    OPEN: () => <Badge variant={'secondary'}>진행중</Badge>,
    CLOSE: () => (
      <Badge variant={'destructive'} className='text-white'>
        경매 종료
      </Badge>
    ),
    PENDING: () => (
      <Badge variant={'secondary'} className='text-white bg-green-500'>
        낙찰
      </Badge>
    ),
    SUCCESS: () => (
      <Badge variant={'secondary'} className='text-white bg-green-700/50'>
        결제 완료
      </Badge>
    ),
    REJECTED: () => (
      <Badge variant={'destructive'} className='text-white bg-rose-500/50'>
        결제 실패
      </Badge>
    ),
    FAIL: () => (
      <Badge variant={'destructive'} className='text-white'>
        패찰
      </Badge>
    ),
    INTRANSIT: () => (
      <Badge variant={'secondary'} className='text-white bg-blue-500/50'>
        배송 중
      </Badge>
    ),
    DELIVERED: () => (
      <Badge variant={'secondary'} className='text-white bg-green-500/50'>
        구매 확정
      </Badge>
    ),
  };

  return (
    <div className='bg-gray-800/50 rounded-lg px-4 py-3'>
      <div className='flex gap-4 items-center '>
        <div className='w-[100px] h-[100px] rounded-lg overflow-hidden shrink-0'>
          <img src={bid.thumbnailUrl} alt='bidding-history-image' />
        </div>
        <div className='w-full flex flex-col gap-2 '>
          <div className='flex justify-between items-center w-full'>
            <div className='flex gap-2 items-center'>
              <span className='text-lg font-bold'>{bid.product}</span>
              <span className='text-sm text-gray-500'>
                판매자: {bid.sellerNickName}
              </span>
            </div>
            {badgeByStatusMapping[bid.status]()}
          </div>
          <div className='flex gap-6'>
            <div className='flex gap-2 flex-col bg-gray-600/50 rounded-lg p-2 min-w-[250px] flex-1'>
              <span className='text-sm text-gray-500'>현재 최고가</span>
              <span className='text-lg font-bold'>
                {bid.highestBidPrice.toLocaleString()}원
              </span>
            </div>
            <div
              className={`flex gap-2 flex-col rounded-lg p-2 min-w-[250px] flex-1 ${
                status === 'SUCCESS' ? 'bg-green-500/50' : 'bg-rose-500/70'
              }`}
            >
              <span className='text-sm text-white'>내 입찰가</span>
              <span className='text-lg font-bold'>
                {bid.myBidPrice.toLocaleString()}원
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className='flex justify-end mt-2'>
        <Button
          variant={'secondary'}
          size={'sm'}
          onClick={() => setIsPaymentModalOpen(true)}
        >
          결제 테스트
        </Button>
      </div>
      <PaymentModal
        bidInfo={bid}
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
      />
      {bottomContentByStatusMapping[bid.status]()}
    </div>
  );
}
