import { useQuery } from '@tanstack/react-query';
import { getAuctions } from '@/api/auction';

export default function useProductList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: () =>
      getAuctions({
        page: 0,
        size: 12,
        keyword: '',
        categoryId: undefined,
        order: 'bids',
      }),
  });
  return { data, isLoading, error };
}
