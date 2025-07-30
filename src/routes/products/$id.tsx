import { useGetProductDetail } from '@/api/auction';
import { useGetBidList } from '@/api/bid';
import BiddingForm from '@/routes/products/_components/BiddingForm';
import DetailHeader from '@/routes/products/_components/DetailHeader';
import ImageLibrary from '@/routes/products/_components/ImageLibrary';
import TabSection from '@/routes/products/_components/TabSection';
import type { Bid, ProductDetail } from '@/types';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';

const BidMessageStatus = {
  BID_CREATED: 'BID_CREATED',
  BID_UPDATED: 'BID_UPDATED',
  BID_DELETED: 'BID_DELETED',
} as const;

type BidMessageStatus =
  (typeof BidMessageStatus)[keyof typeof BidMessageStatus];

interface BidMessage {
  bidMessageStatus: BidMessageStatus;
  bidResponse: Bid;
}

export const Route = createFileRoute('/products/$id')({
  component: RouteComponent,
  staticData: {
    hideHeader: true,
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data: initialProductDetail } = useGetProductDetail(Number(id));
  const { data: initialBiddingHistory } = useGetBidList(Number(id), {
    page: 0,
    size: 20,
  });

  const [productDetail, setProductDetail] = useState<ProductDetail | null>(
    null
  );
  const [bids, setBids] = useState<Bid[]>([]);
  const [totalBids, setTotalBids] = useState(0);

  const ws = useRef<WebSocket | null>(null);
  const websocketUrl = `ws://www.deal4u.shop/ws/auction/${id}`;

  useEffect(() => {
    if (initialProductDetail) {
      setProductDetail(initialProductDetail);
    }
    if (initialBiddingHistory) {
      setBids(initialBiddingHistory.content);
      setTotalBids(initialBiddingHistory.totalElements);
    }
  }, [initialProductDetail, initialBiddingHistory]);

  useEffect(() => {
    ws.current = new WebSocket(websocketUrl);

    ws.current.onopen = () => console.log('***** 웹소켓 연결 성공 *****');
    ws.current.onclose = () => console.log('***** 웹소켓 연결 종료 *****');
    ws.current.onerror = error =>
      console.error('***** 웹소켓 에러 *****', error);

    ws.current.onmessage = event => {
      if (event.data) {
        try {
          const message: BidMessage = JSON.parse(event.data);
          const updatedBid = message.bidResponse;

          switch (message.bidMessageStatus) {
            case BidMessageStatus.BID_CREATED: {
              setBids(prevBids => [updatedBid, ...prevBids]);
              setTotalBids(prevTotal => prevTotal + 1);
              setProductDetail(prevDetail => {
                if (!prevDetail) return null;
                return {
                  ...prevDetail,
                  highestBidPrice: updatedBid.bidPrice,
                  bidCount: prevDetail.bidCount + 1,
                };
              });
              break;
            }
            case BidMessageStatus.BID_UPDATED: {
              setBids(prevBids =>
                prevBids.map(bid =>
                  bid.bidId === updatedBid.bidId ? updatedBid : bid
                )
              );
              break;
            }
            case BidMessageStatus.BID_DELETED: {
              setBids(prevBids => {
                const newBids = prevBids.filter(
                  bid => bid.bidId !== updatedBid.bidId
                );
                setProductDetail(prevDetail => {
                  if (!prevDetail) return null;
                  const newHighestBidPrice =
                    newBids.length > 0
                      ? newBids[0].bidPrice
                      : prevDetail.startingPrice;
                  return {
                    ...prevDetail,
                    highestBidPrice: newHighestBidPrice,
                    bidCount: Math.max(0, prevDetail.bidCount - 1),
                  };
                });
                return newBids;
              });
              setTotalBids(prevTotal => prevTotal - 1);
              break;
            }
            default:
              console.warn(
                '처리되지 않은 메시지 상태:',
                message.bidMessageStatus
              );
          }
        } catch (error) {
          console.error('***** 웹소켓 메시지 처리 에러 *****', error);
        }
      }
    };

    return () => {
      ws.current?.close();
    };
  }, [id, websocketUrl]);

  return (
    <div className='bg-gray-800/50 p-10'>
      <DetailHeader isWishList={productDetail?.isWishList ?? false} />
      <div className='flex gap-10 mt-[69px] '>
        <div className='flex flex-col flex-2 gap-5'>
          <ImageLibrary
            images={productDetail?.imageUrls || []}
            thumbnail={productDetail?.thumbnailUrl || ''}
          />
          {productDetail && (
            <TabSection
              productDetail={productDetail}
              bids={bids}
              totalBids={totalBids}
            />
          )}
        </div>
        <div className='flex-1'>
          {productDetail && <BiddingForm productDetail={productDetail} />}
        </div>
      </div>
    </div>
  );
}
