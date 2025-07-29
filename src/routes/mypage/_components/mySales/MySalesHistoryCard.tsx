import { useCreateSettlement } from '@/api/settlement';
import { useCreateShipment } from '@/api/shipment';
import BiddingCancelConfirmModal from '@/components/bidding-cancel-confirm-modal';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { usePaymentCountdown } from '@/hooks/usePaymentCountdown';
import type { MyAuction } from '@/types';
import { LucideTimer, LucideCrown, LucideSend } from 'lucide-react';

export type SalesStatus =
  | 'OPEN'
  | 'FAIL'
  | 'PENDING'
  | 'SUCCESS'
  | 'REJECTED'
  | 'INTRANSIT'
  | 'DELIVERED';

interface Props {
  status: SalesStatus;
  auctionId: number;
  salesData: MyAuction;
}

export default function MySalesHistoryCard({
  status,
  auctionId,
  salesData,
}: Props) {
  const { mutate: createSettlement } = useCreateSettlement();
  const timeLeft = usePaymentCountdown(salesData.endTime);

  const { mutate: createShipment } = useCreateShipment();

  const bottomContentByStatusMapping = {
    OPEN: () => (
      <div className='flex justify-end mt-4 w-full'>
        <BiddingCancelConfirmModal auctionId={auctionId} />
      </div>
    ),
    PENDING: () => (
      <div className='rounded-lg p-4 border border-gray-500 flex gap-2 mt-4'>
        <LucideTimer className='w-6 h-6' />
        <div className='flex flex-col gap-2'>
          <div className='flex gap-2 items-center'>
            <span className='text-sm text-white'>낙찰자:</span>
            <span className='text-sm text-white'>{salesData.bidderName}</span>
          </div>
          <div className='flex gap-2 items-center'>
            <span className='text-sm text-white'>결제마감일:</span>
            <span className='text-sm text-white'>
              {salesData.paymentDeadline}
            </span>
          </div>
          <div className='flex gap-2 items-center'>
            <span className='text-sm text-orange-500'>남은 시간:</span>
            <span className='text-sm text-orange-500'>{timeLeft}</span>
          </div>
          <span className='text-sm text-gray-500'>
            낙찰자가 24시간 내에 결제하지 않으먼 차상위 입찰지이게 기회가
            제공됩니다.
          </span>
        </div>
      </div>
    ),
    // 차상위 상태
    REJECTED: () => (
      <div className='rounded-lg p-4 border border-gray-500 flex gap-2 mt-4 w-full'>
        <LucideTimer className='w-6 h-6' />
        <div className='flex flex-col gap-2 w-full'>
          <div className='flex gap-2 items-center'>
            <span className='text-sm text-white'>차상위 입찰자:</span>
            <span className='text-sm text-white'>{salesData.bidderName}</span>
          </div>
          <div className='flex gap-2 items-center'>
            <span className='text-sm text-white'>차상위 입찰 결제 마감:</span>
            <span className='text-sm text-white'>
              {salesData.paymentDeadline}
            </span>
          </div>
          <div className='flex gap-2 items-center'>
            <span className='text-sm text-orange-500'>남은 시간:</span>
            <span className='text-sm text-orange-500'>{timeLeft}</span>
          </div>

          <div className='flex items-center justify-between w-full'>
            <span className='text-sm text-gray-500'>
              낙찰자가 24시간 내에 결제하지 않으먼 차상위 입찰지이게 기회가
              제공됩니다.
            </span>
            <Button
              variant={'outline'}
              onClick={() => createSettlement({ auctionId })}
            >
              <LucideSend /> 차상위 입찰자에게 알림 보내기
            </Button>
          </div>
        </div>
      </div>
    ),
    // TODO: 결제 완료 상태로 교체
    SUCCESS: () => (
      <div className='rounded-lg p-4 border border-gray-500 flex flex-col gap-2 mt-4'>
        <div className='flex gap-2 items-center'>
          <span className='text-md text-white font-bold'>운송장 번호: </span>
          <input
            placeholder='운송장 번호를 입력해주세요.'
            className='rounded-lg p-2 bg-gray-600/50 w-[350px]'
          />
          <Button
            variant={'outline'}
            onClick={() => createShipment({ auctionId })}
          >
            운송장 번호 입력
          </Button>
        </div>
        <Accordion type='single' collapsible>
          <AccordionItem value='item-1'>
            <AccordionTrigger className='flex items-center justify-center border border-gray-500 rounded-lg p-2'>
              낙찰자 정보 확인
            </AccordionTrigger>
            <AccordionContent>
              <div className='bg-gradient-to-r from-emerald-900/80 rounded-lg to-emerald-700/60 shadow-lg border border-emerald-800/40 p-6 flex flex-col gap-4 w-full'>
                <div className='flex items-center gap-2 mb-2'>
                  <LucideCrown className='w-6 h-6 text-yellow-300' />
                  <span className='text-white font-bold text-xl'>
                    낙찰자 정보
                  </span>
                </div>
                <div className='grid grid-cols-2 md:grid-cols-2 gap-0'>
                  <div className='flex flex-col items-start gap-1'>
                    <span className='text-gray-300 text-xs'>받는 분</span>
                    <span className='text-white font-semibold'>홍길동</span>
                  </div>
                  <div className='flex flex-col items-start gap-1 py-2 px-4'>
                    <span className='text-gray-300 text-xs'>연락처</span>
                    <span className='text-white font-semibold'>
                      010-1234-5678
                    </span>
                  </div>
                </div>
                <div className='flex flex-col gap-1'>
                  <span className='text-gray-300 text-xs'>배송주소</span>
                  <span className='text-white font-semibold'>
                    서울시 강남구 역삼동 123-123
                  </span>
                </div>
                <div className='flex flex-col gap-1'>
                  <span className='text-gray-300 text-xs'>배송 요청사항</span>
                  <span className='text-white font-semibold'>
                    문 앞에 놓아주세요.
                  </span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    ),
    FAIL: () => (
      //   <div className='flex gap-2 w-full items-center justify-end mt-4'>
      //     <div className='rounded-lg p-2 bg-gray-600/50'>
      //       <span className='text-sm text-white flex gap-2 items-center'>
      //         <LucideAlertCircle /> 결제 시간 초과로 차상위 입찰자에게 기회가
      //         넘어갔습니다.
      //       </span>
      //     </div>
      //   </div>
      <></>
    ),
    DELIVERED: () => <></>,
    INTRANSIT: () => <></>,
  };

  const badgeByStatusMapping = {
    OPEN: () => <Badge variant={'secondary'}>진행중</Badge>,
    PENDING: () => (
      <Badge variant={'destructive'} className='text-white'>
        결제 대기
      </Badge>
    ),
    SUCCESS: () => (
      <Badge variant={'secondary'} className='text-white bg-green-500'>
        결제 완료
      </Badge>
    ),
    REJECTED: () => (
      <Badge variant={'secondary'} className='text-white bg-green-700/50'>
        차상위 대기
      </Badge>
    ),
    INTRANSIT: () => (
      <Badge variant={'destructive'} className='text-white bg-rose-500/50'>
        배송 완료
      </Badge>
    ),
    DELIVERED: () => (
      <Badge variant={'secondary'} className='text-white bg-green-500/50'>
        배송 완료
      </Badge>
    ),
    FAIL: () => (
      <Badge variant={'destructive'} className='text-white'>
        유찰
      </Badge>
    ),
  };

  return (
    <div className='bg-gray-800/50 rounded-lg px-4 py-3'>
      <div className='flex gap-4 items-center '>
        <div className='w-[100px] h-[100px] rounded-lg overflow-hidden shrink-0'>
          <img
            src={'https://picsum.photos/200/300'}
            alt='bidding-history-image'
          />
        </div>
        <div className='w-full flex flex-col gap-2 '>
          <div className='flex justify-between items-center w-full'>
            <div className='flex gap-2 items-center'>
              <span className='text-lg font-bold'>아이폰 16 프로 맥스</span>
              <Badge variant={'secondary'}>물품카테고리</Badge>
            </div>
            {badgeByStatusMapping[status]()}
          </div>
          <div className='flex gap-6'>
            <div className='flex gap-2 flex-col rounded-lg p-2 min-w-[250px] flex-1'>
              <span className='text-sm text-gray-500'>시작가</span>
              <span className='text-lg font-bold text-green-500/80'>
                100,000원
              </span>
            </div>
            <div
              className={`flex gap-2 flex-col rounded-lg p-2 min-w-[250px] flex-1`}
            >
              <span className='text-sm text-white'>현재가/낙찰가</span>
              <span className='text-lg font-bold text-blue-500/80'>
                100,000원
              </span>
            </div>
            <div
              className={`flex gap-2 flex-col rounded-lg p-2 min-w-[250px] flex-1`}
            >
              <span className='text-sm text-white'>입찰수</span>
              <span className='text-lg font-bold'>12회</span>
            </div>
          </div>
        </div>
      </div>
      {bottomContentByStatusMapping[status]()}
    </div>
  );
}
