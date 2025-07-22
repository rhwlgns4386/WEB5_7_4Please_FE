import { createWishList } from '@/api/member';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export default function useWishlist() {
  const { mutate: registerWishList } = useMutation({
    mutationFn: createWishList,
    onSuccess: () => {
      toast('관심상품에 추가되었습니다.');
    },
    onError: () => {
      toast('관심상품에 추가에 실패했습니다.');
    },
  });
  return { registerWishList };
}
