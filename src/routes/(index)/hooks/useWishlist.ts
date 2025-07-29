import { createWishList } from '@/api/wishlist';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export default function useWishlist() {
  const queryClient = useQueryClient();
  const { mutate: registerWishList } = useMutation({
    mutationFn: createWishList,
    onSuccess: () => {
      toast('관심상품에 추가되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['auctions'] });
    },
    onError: () => {
      toast('관심상품에 추가에 실패했습니다.');
    },
  });
  return { registerWishList };
}
