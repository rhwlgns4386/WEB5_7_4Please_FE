import { createAuction } from '@/api/auction';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export default function useCreateAuction() {
  const postAuction = useMutation({
    mutationFn: createAuction,
    onSuccess: () => {
      toast('경매 등록 완료', {
        description: '경매 등록이 완료되었습니다.',
        duration: 3000,
      });
    },
  });

  return { postAuction };
}
