import { useDeleteAuction } from '@/api/auction';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface BiddingCancelConfirmModalProps {
  auctionId: number;
}

export default function BiddingCancelConfirmModal({
  auctionId,
}: BiddingCancelConfirmModalProps) {
  const { mutate: deleteAuction } = useDeleteAuction();

  const handleCancel = () => {
    deleteAuction({ auctionId });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'destructive'}>경매 취소</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>경매 취소</DialogTitle>
        </DialogHeader>
        <DialogDescription>경매를 취소하시겠습니까?</DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={'outline'}>취소</Button>
          </DialogClose>
          <Button variant={'destructive'} onClick={handleCancel}>
            경매 취소
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
