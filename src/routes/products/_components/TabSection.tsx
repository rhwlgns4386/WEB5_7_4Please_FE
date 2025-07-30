import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import BiddingHistoryTab from '@/routes/products/_components/BiddingHistoryTab';
import DescriptionTab from '@/routes/products/_components/DescriptionTab';
import SellerInfoTab from '@/routes/products/_components/SellerInfoTab';
import type { Bid, ProductDetail } from '@/types';

interface TabSectionProps {
  productDetail: ProductDetail;
  bids: Bid[];
  totalBids: number;
}

export default function TabSection({
  productDetail,
  bids,
  totalBids,
}: TabSectionProps) {
  return (
    <Tabs defaultValue='description'>
      <TabsList className='w-full'>
        <TabsTrigger value='description'>상품 설명</TabsTrigger>
        <TabsTrigger value='biddingHistory'>입찰 내역</TabsTrigger>
        <TabsTrigger value='sellerInfo'>판매자 정보</TabsTrigger>
      </TabsList>
      <div className='border border-gray-500 rounded-lg p-4'>
        <TabsContent value='description'>
          <DescriptionTab description={productDetail.description} />
        </TabsContent>
        <TabsContent value='biddingHistory'>
          <BiddingHistoryTab bids={bids} totalBids={totalBids} />
        </TabsContent>
        <TabsContent value='sellerInfo'>
          <SellerInfoTab />
        </TabsContent>
      </div>
    </Tabs>
  );
}
