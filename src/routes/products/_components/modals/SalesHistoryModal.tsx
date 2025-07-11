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
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-[800px]! max-h-[700px] overflow-y-auto'>
        <DialogHeader className='flex gap-4 flex-row'>
          <DialogTitle>김판매님의 판매 내역</DialogTitle>
          <DialogDescription>4건</DialogDescription>
        </DialogHeader>
        {Array.from({ length: 6 }).map((_, _index) => (
          <div className='border border-gray-500 rounded-lg p-4 flex flex-row gap-4'>
            <div className='w-[100px] h-[100px] rounded-lg overflow-hidden flex-shrink-0'>
              <img
                src='https://placehold.co/600x400'
                alt='product-thumbnail'
                className='w-full h-full object-cover block'
              />
            </div>
            <div className='flex flex-col gap-2 w-full'>
              <div className='flex flex-row w-full justify-between'>
                <span className='text-lg font-bold'>갤럭시s23Ultra</span>
                <Badge variant={'outline'} className='bg-gray-500 text-white'>
                  경매 대기
                </Badge>
              </div>
              <span className='text-sm text-gray-500'>상품 설명</span>
              <div className='text-sm text-gray-500 line-clamp-3'>
                상품 설명입니다. 상품 설명입니다. 상품 설명입니다. 상품
                설명입니다. 상품 설명입니다.상품 설명입니다. 상품 설명입니다.
                상품 설명입니다. 상품 설명입니다. 상품 설명입니다. 상품
                설명입니다. 상품 설명입니다. 상품 설명입니다. 상품 설명입니다.
                상품 설명입니다.상품 설명입니다. 상품 설명입니다. 상품
                설명입니다. 상품 설명입니다. 상품 설명입니다.
              </div>
            </div>
          </div>
        ))}
      </DialogContent>
    </Dialog>
  );
}
