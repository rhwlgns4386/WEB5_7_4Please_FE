import { useGetBidList } from '@/api/bid';
import BiddingHistoryCard from '@/routes/products/_components/BiddingHistoryCard';
import { useParams } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import type { Bid } from '@/types';

// 1. 백엔드와 약속된 메시지 상태와 타입을 정의합니다.
const BidMessageStatus = {
  BID_CREATED: 'BID_CREATED',
  BID_UPDATED: 'BID_UPDATED',
  BID_DELETED: 'BID_DELETED',
} as const;

type BidMessageStatus =
  (typeof BidMessageStatus)[keyof typeof BidMessageStatus];

interface BidMessage {
  status: BidMessageStatus;
  payload: Bid;
}

export default function BiddingHistoryTab() {
  const { id } = useParams({ from: '/products/$id' });

  const { data: initialBiddingHistory } = useGetBidList(Number(id), {
    page: 0,
    size: 20,
  });

  const [bids, setBids] = useState<Bid[]>([]);
  const [totalBids, setTotalBids] = useState(0);

  const ws = useRef<WebSocket | null>(null);

  // 환경 변수를 사용한 절대 경로를 권장합니다.
  const websocketUrl = `ws://www.deal4u.shop/ws/auction/${id}`;

  useEffect(() => {
    if (initialBiddingHistory) {
      setBids(initialBiddingHistory.content);
      setTotalBids(initialBiddingHistory.totalElements);
    }
  }, [initialBiddingHistory]);

  useEffect(() => {
    // 이미 연결이 존재하면 중복 연결을 방지합니다.
    ws.current = new WebSocket(websocketUrl);

    ws.current.onopen = () => {
      console.log('***** 웹소켓 연결 성공 *****');
    };

    ws.current.onmessage = event => {
      if (event.data) {
        try {
          // 2. 정의한 타입으로 메시지를 파싱합니다.
          const message: BidMessage = JSON.parse(event.data);

          // 3. 메시지 상태에 따라 분기 처리합니다.
          switch (message.status) {
            case BidMessageStatus.BID_CREATED:
              setBids(prevBids => [message.payload, ...prevBids]);
              setTotalBids(prevTotal => prevTotal + 1);
              break;

            case BidMessageStatus.BID_UPDATED:
              setBids(prevBids =>
                prevBids.map(bid =>
                  bid.bidId === message.payload.bidId ? message.payload : bid
                )
              );
              break;

            case BidMessageStatus.BID_DELETED:
              setBids(prevBids =>
                prevBids.filter(bid => bid.bidId !== message.payload.bidId)
              );
              setTotalBids(prevTotal => prevTotal - 1);
              break;

            default:
              console.warn('처리되지 않은 메시지 상태:', message.status);
          }
        } catch (error) {
          console.error('***** 웹소켓 메시지 처리 에러 *****', error);
        }
      }
    };

    ws.current.onerror = error => {
      console.error('***** 웹소켓 에러 *****', error);
    };

    ws.current.onclose = () => {
      console.log('***** 웹소켓 연결 종료 *****');
      ws.current = null; // 연결이 끊기면 참조를 정리합니다.
    };

    return () => {
      ws.current?.close();
    };
  }, [id, websocketUrl]);

  return (
    <div>
      <div className='flex flex-col gap-2 w-full border-b border-foreground/50 pb-2'>
        <h1 className='text-2xl font-bold'>실시간 입찰 내역</h1>
        <span className='text-sm text-gray-500'>총 {totalBids}회 입찰</span>
      </div>
      <div className='flex flex-col gap-2 overflow-y-auto mt-2 h-[480px] p-4'>
        {bids.map((bid, index) => (
          <BiddingHistoryCard
            key={bid.bidId}
            bid={bid}
            isHighestBid={index === 0}
          />
        ))}
      </div>
    </div>
  );
}
