import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MyBiddingTab from '@/routes/mypage/_components/MyBiddingTab';
import MyFavoriteTab from '@/routes/mypage/_components/MyFavoriteTab';
import MySalesTab from '@/routes/mypage/_components/MySalesTab';

export default function MyPageTab() {
  return (
    <Tabs defaultValue='myBidding'>
      <TabsList className='w-full'>
        <TabsTrigger value='myBidding'>내 입찰</TabsTrigger>
        <TabsTrigger value='mySales'>내 판매</TabsTrigger>
        <TabsTrigger value='favorite'>관심 목록</TabsTrigger>
      </TabsList>
      <div className='border border-gray-500 rounded-lg p-4'>
        <TabsContent value='myBidding'>
          <MyBiddingTab />
        </TabsContent>
        <TabsContent value='mySales'>
          <MySalesTab />
        </TabsContent>
        <TabsContent value='favorite'>
          <MyFavoriteTab />
        </TabsContent>
      </div>
    </Tabs>
  );
}
