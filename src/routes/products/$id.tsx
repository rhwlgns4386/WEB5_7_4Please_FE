import BiddingForm from '@/routes/products/_components/BiddingForm';
import DetailHeader from '@/routes/products/_components/DetailHeader';
import ImageLibrary from '@/routes/products/_components/ImageLibrary';
import TabSection from '@/routes/products/_components/TabSection';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/products/$id')({
  component: RouteComponent,
  staticData: {
    hideHeader: true,
  },
});

function RouteComponent() {
  return (
    <div className='bg-gray-800/50 p-10'>
      <DetailHeader />
      <div className='flex gap-10 mt-[69px] '>
        <div className='flex flex-col flex-2 gap-5'>
          <ImageLibrary />
          <TabSection />
        </div>
        <div className='flex-1'>
          <BiddingForm />
        </div>
      </div>
    </div>
  );
}
