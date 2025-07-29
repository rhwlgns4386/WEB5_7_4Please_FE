import { useGetSalesList } from '@/api/sale';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function SalesHistoryModal({ isOpen, onClose }: Props) {
  const { data: salesList } = useGetSalesList({
    sellerId: 1,
    page: 0,
    size: 10,
  });

  const mappingUIByStatus: Record<string, string> = {
    OPEN: '진행중',
    PENDING: '결제 대기',
    SUCCESS: '결제 완료',
    REJECT: '차상위 대기',
    INTRANSIT: '배송 완료',
    DELIVERED: '구매 확정',
    CLOSE: '경매 종료',
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-[800px]! max-h-[700px] overflow-y-auto'>
        <DialogHeader className='flex gap-4 flex-row'>
          <DialogTitle>판매 내역</DialogTitle>
          <DialogDescription>{salesList?.totalElements}건</DialogDescription>
        </DialogHeader>
        {salesList?.content.map(salesList => (
          <div className='border border-gray-500 rounded-lg p-4 flex flex-row gap-4'>
            <div className='w-[100px] h-[100px] rounded-lg overflow-hidden flex-shrink-0'>
              <img
                src={salesList?.thumbnailUrl}
                alt='product-thumbnail'
                className='w-full h-full object-cover block'
              />
            </div>
            <div className='flex flex-col gap-2 w-full'>
              <div className='flex flex-row w-full justify-between'>
                <span className='text-lg font-bold'>{salesList?.name}</span>
                <Badge variant={'outline'} className='bg-accent text-white'>
                  {mappingUIByStatus[salesList?.status]}
                </Badge>
              </div>
              <span className='text-sm text-gray-500'>상품 설명</span>
              <div className='text-sm text-gray-500 line-clamp-3'>
                {salesList?.description}
              </div>
            </div>
          </div>
        ))}
      </DialogContent>
    </Dialog>
  );
}
