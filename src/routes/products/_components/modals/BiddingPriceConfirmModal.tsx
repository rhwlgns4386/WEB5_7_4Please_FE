import { Button } from '@/components/ui/button';
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
  onSubmit: () => void;
  bidPrice: number;
}

export default function BiddingPriceConfirmModal({
  isOpen,
  onClose,
  onSubmit,
  bidPrice,
}: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>입찰 금액</DialogTitle>
          <DialogDescription>
            {bidPrice.toLocaleString()}원을 입찰하시겠습니까?
          </DialogDescription>
        </DialogHeader>
        <div className='flex flex-row gap-2 w-full justify-center'>
          <Button variant={'outline'} onClick={onClose} className='w-[230px]'>
            취소
          </Button>
          <Button
            className='bg-orange-600 hover:bg-orange-700 text-gray-50 font-bold w-[230px]'
            onClick={onSubmit}
          >
            확인
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
