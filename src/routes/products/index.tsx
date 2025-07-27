import { createFileRoute, Link, useRouter } from '@tanstack/react-router';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import ProductCard from '@/routes/(index)/_components/ProductCard';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from '@/components/ui/pagination';
import { useGetAuctionList } from '@/api/auction';

type SortType = 'latest' | 'bids' | 'timeout';

type ProductsSearch = {
  category: string;
  query: string;
  sort: SortType;
  page: number;
};

export const Route = createFileRoute('/products/')({
  validateSearch: (search: Record<string, unknown>): ProductsSearch => ({
    category: (search.category as string) || 'all',
    query: (search.query as string) || '',
    sort: (search.sort as SortType) || 'latest',
    page: Number(search.page) || 0,
  }),
  component: Products,
});

// 카테고리 매핑
const categoryMap = {
  all: '전체',
  '0': '패션',
  '1': '전자제품',
  '2': '스포츠',
  '3': '가구',
  '4': '생활용품',
  '5': '기타',
};

function Products() {
  const router = useRouter();
  const searchParams = Route.useSearch();

  // 필터 UI의 입력 상태를 관리하기 위한 로컬 상태
  const [localCategory, setLocalCategory] = useState(searchParams.category);
  const [localQuery, _setLocalQuery] = useState(searchParams.query);
  const [localSort, _setLocalSort] = useState<SortType>(searchParams.sort);

  const { data: productList } = useGetAuctionList({
    page: searchParams.page,
    size: 20,
    keyword: searchParams.query,
    categoryId:
      searchParams.category === 'all'
        ? undefined
        : Number(searchParams.category),
    order: searchParams.sort,
  });

  console.log(productList);

  // URL을 업데이트하는 중앙 함수
  const updateURL = (newSearch: Partial<ProductsSearch>) => {
    const shouldResetPage =
      newSearch.category !== undefined ||
      newSearch.query !== undefined ||
      newSearch.sort !== undefined;

    const updatedSearch = {
      ...searchParams,
      ...newSearch,
      page: shouldResetPage ? 0 : (newSearch.page ?? searchParams.page),
    };

    router.navigate({ to: '/products', search: updatedSearch });
  };

  const handleSearch = () => {
    updateURL({
      category: localCategory,
      query: localQuery.trim(),
      sort: localSort,
    });
  };

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      {/* 헤더 타이틀 */}
      <div className='bg-white dark:bg-gray-800 border-b dark:border-gray-700'>
        <div className='container mx-auto px-4 py-6'>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
            {categoryMap[searchParams.category as keyof typeof categoryMap]}{' '}
            상품
            {searchParams.query && (
              <span className='text-orange-500 ml-2'>
                '{searchParams.query}'
              </span>
            )}
          </h1>
          <p className='text-gray-600 dark:text-gray-400 mt-2'>
            총 {productList?.totalElements ?? 0}개의 상품을 찾았습니다
          </p>
        </div>
      </div>

      {/* 필터 섹션 */}
      <div className='bg-white dark:bg-gray-800 border-b dark:border-gray-700'>
        <div className='container mx-auto px-4 py-4'>
          <div className='flex flex-col lg:flex-row gap-4 items-start lg:items-center'>
            {/* 카테고리 필터 */}
            <Select
              value={localCategory}
              onValueChange={value => setLocalCategory(value)}
            >
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='카테고리 선택' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>카테고리</SelectLabel>
                  <SelectItem value='all'>전체</SelectItem>
                  <SelectItem value='0'>패션</SelectItem>
                  <SelectItem value='1'>전자제품</SelectItem>
                  <SelectItem value='2'>스포츠</SelectItem>
                  <SelectItem value='3'>가구</SelectItem>
                  <SelectItem value='4'>생활용품</SelectItem>
                  <SelectItem value='5'>기타</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* 정렬 필터 */}
            <Select
              value={searchParams.sort}
              onValueChange={(value: string) =>
                updateURL({ sort: value as SortType })
              }
            >
              <SelectTrigger className='w-[150px]'>
                <SelectValue placeholder='정렬 방식' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>정렬</SelectLabel>
                  <SelectItem value='latest'>최신순</SelectItem>
                  <SelectItem value='bids'>인기순</SelectItem>
                  <SelectItem value='timeout'>마감임박순</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* 검색 입력 */}
            <div className='flex-1 flex gap-2'>
              <div className='relative flex-1'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
                <Input
                  value={searchParams.query}
                  onChange={e => updateURL({ query: e.target.value })}
                  onKeyDown={e => e.key === 'Enter' && handleSearch()}
                  placeholder='상품명을 검색해보세요...'
                  className='pl-10'
                />
              </div>
              <Button
                onClick={handleSearch}
                className='bg-orange-600 hover:bg-orange-700 text-white'
              >
                검색하기
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 상품 리스트 */}
      <div className='container mx-auto px-4 py-8'>
        {productList?.content && productList.content.length > 0 ? (
          <>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
              {productList.content.map(product => (
                <Link
                  to={`/products/$id`}
                  params={{ id: product.auctionId.toString() }}
                  key={product.auctionId}
                >
                  <ProductCard product={product} theme='dark' />
                </Link>
              ))}
            </div>

            {/* 페이지네이션 */}
            {productList.totalPages > 1 && (
              <div className='flex justify-center'>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <button
                        onClick={() =>
                          searchParams.page > 0 &&
                          updateURL({ page: searchParams.page - 1 })
                        }
                        className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 gap-1 pl-2.5 ${
                          searchParams.page <= 0
                            ? 'pointer-events-none opacity-50'
                            : 'cursor-pointer'
                        }`}
                        disabled={searchParams.page <= 0}
                      >
                        이전
                      </button>
                    </PaginationItem>

                    {[...Array(productList.totalPages)].map((_, i) => (
                      <PaginationItem key={i}>
                        <button
                          onClick={() => updateURL({ page: i })}
                          className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 cursor-pointer ${
                            searchParams.page === i
                              ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                              : ''
                          }`}
                        >
                          {i + 1}
                        </button>
                      </PaginationItem>
                    ))}

                    <PaginationItem>
                      <button
                        onClick={() =>
                          searchParams.page < productList.totalPages - 1 &&
                          updateURL({ page: searchParams.page + 1 })
                        }
                        className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 gap-1 pr-2.5 ${
                          searchParams.page >= productList.totalPages - 1
                            ? 'pointer-events-none opacity-50'
                            : 'cursor-pointer'
                        }`}
                        disabled={
                          searchParams.page >= productList.totalPages - 1
                        }
                      >
                        다음
                      </button>
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        ) : (
          <div className='text-center py-16'>
            <p className='text-xl text-gray-500 dark:text-gray-400'>
              검색 결과가 없습니다.
            </p>
            <p className='text-gray-400 dark:text-gray-500 mt-2'>
              다른 키워드로 검색해보세요.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
