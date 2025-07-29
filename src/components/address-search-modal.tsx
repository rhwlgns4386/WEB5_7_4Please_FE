import DaumPostcodeEmbed, { type Address } from 'react-daum-postcode';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface AddressSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (address: Address) => void;
}

export default function AddressSearchModal({
  isOpen,
  onClose,
  onComplete,
}: AddressSearchModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <DialogTitle>주소 검색</DialogTitle>
        </DialogHeader>
        <DaumPostcodeEmbed
          onComplete={onComplete}
          autoClose
          style={{ height: '500px' }}
        />
      </DialogContent>
    </Dialog>
  );
}
