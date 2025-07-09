import { createFileRoute, Link, useRouter } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
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
import { popularProducts } from '@/routes/(index)/_constants/products';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from '@/components/ui/pagination';

// Search 파라미터 타입 정의
type ProductsSearch = {
  category?: string;
  query?: string;
  sort?: 'latest' | 'popular';
  page?: number;
};

export const Route = createFileRoute('/products/')({
  validateSearch: (search: Record<string, unknown>): ProductsSearch => ({
    category: (search.category as string) || 'all',
    query: (search.query as string) || '',
    sort: (search.sort as 'latest' | 'popular') || 'latest',
    page: Number(search.page) || 1,
  }),
  component: Products,
});

// 카테고리 매핑
const categoryMap = {
  all: '전체',
  fashion: '패션',
  electronics: '전자제품',
  sports: '스포츠',
  furniture: '가구',
  household: '생활용품',
  etc: '기타',
};

function Products() {
  const router = useRouter();
  const [currentSearch, setCurrentSearch] = useState<ProductsSearch>({});

  // URL에서 search params 읽기
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setCurrentSearch({
      category: urlParams.get('category') || 'all',
      query: urlParams.get('query') || '',
      sort: (urlParams.get('sort') as 'latest' | 'popular') || 'latest',
      page: Number(urlParams.get('page')) || 1,
    });
  }, []);

  // 로컬 상태 (폼 입력용)
  const [localCategory, setLocalCategory] = useState(
    currentSearch.category || 'all'
  );
  const [localQuery, setLocalQuery] = useState(currentSearch.query || '');
  const [localSort, setLocalSort] = useState(currentSearch.sort || 'latest');

  // URL 업데이트 함수
  const updateURL = (newSearch: Partial<ProductsSearch>) => {
    const updatedSearch = { ...currentSearch, ...newSearch };
    if (
      newSearch.category !== undefined ||
      newSearch.query !== undefined ||
      newSearch.sort !== undefined
    ) {
      updatedSearch.page = 1; // 새 검색시 page 1로 리셋
    }

    const params = new URLSearchParams();
    if (updatedSearch.category && updatedSearch.category !== 'all') {
      params.set('category', updatedSearch.category);
    }
    if (updatedSearch.query) {
      params.set('query', updatedSearch.query);
    }
    if (updatedSearch.sort && updatedSearch.sort !== 'latest') {
      params.set('sort', updatedSearch.sort);
    }
    if (updatedSearch.page && updatedSearch.page > 1) {
      params.set('page', updatedSearch.page.toString());
    }

    const newURL = `/products/${params.toString() ? '?' + params.toString() : ''}`;
    router.navigate({ to: newURL });
    setCurrentSearch(updatedSearch);
  };

  // 검색 실행
  const handleSearch = () => {
    updateURL({
      category: localCategory,
      query: localQuery.trim(),
      sort: localSort,
    });
  };

  // 페이지 변경
  const handlePageChange = (page: number) => {
    updateURL({ page });
  };

  // 상품 필터링 및 정렬 로직 (임시 데이터 사용)
  const filteredProducts = popularProducts.filter(product => {
    const category = currentSearch.category || 'all';
    const query = currentSearch.query || '';

    const categoryMatch =
      category === 'all' ||
      (category === 'electronics' && product.tag === '전자제품') ||
      (category === 'fashion' && product.tag === '패션') ||
      (category === 'sports' && product.tag === '스포츠') ||
      (category === 'furniture' && product.tag === '가구') ||
      (category === 'household' && product.tag === '생활용품');

    const queryMatch =
      !query || product.title.toLowerCase().includes(query.toLowerCase());

    return categoryMatch && queryMatch;
  });

  // 정렬 적용
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const sort = currentSearch.sort || 'latest';
    if (sort === 'popular') {
      return b.bidCount - a.bidCount;
    }
    return a.id - b.id; // latest (기본값)
  });

  // 페이지네이션
  const itemsPerPage = 20;
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const currentPage = currentSearch.page || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = sortedProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      {/* 헤더 타이틀 */}
      <div className='bg-white dark:bg-gray-800 border-b dark:border-gray-700'>
        <div className='container mx-auto px-4 py-6'>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
            {
              categoryMap[
                (currentSearch.category || 'all') as keyof typeof categoryMap
              ]
            }{' '}
            상품
            {currentSearch.query && (
              <span className='text-orange-500 ml-2'>
                '{currentSearch.query}'
              </span>
            )}
          </h1>
          <p className='text-gray-600 dark:text-gray-400 mt-2'>
            총 {sortedProducts.length}개의 상품을 찾았습니다
          </p>
        </div>
      </div>

      {/* 필터 섹션 */}
      <div className='bg-white dark:bg-gray-800 border-b dark:border-gray-700'>
        <div className='container mx-auto px-4 py-4'>
          <div className='flex flex-col lg:flex-row gap-4 items-start lg:items-center'>
            {/* 카테고리 필터 */}
            <Select value={localCategory} onValueChange={setLocalCategory}>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='카테고리 선택' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>카테고리</SelectLabel>
                  <SelectItem value='all'>전체</SelectItem>
                  <SelectItem value='fashion'>패션</SelectItem>
                  <SelectItem value='electronics'>전자제품</SelectItem>
                  <SelectItem value='sports'>스포츠</SelectItem>
                  <SelectItem value='furniture'>가구</SelectItem>
                  <SelectItem value='household'>생활용품</SelectItem>
                  <SelectItem value='etc'>기타</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* 정렬 필터 */}
            <Select
              value={localSort}
              onValueChange={(value: 'latest' | 'popular') =>
                setLocalSort(value)
              }
            >
              <SelectTrigger className='w-[150px]'>
                <SelectValue placeholder='정렬 방식' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>정렬</SelectLabel>
                  <SelectItem value='latest'>최신순</SelectItem>
                  <SelectItem value='popular'>인기순</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* 검색 입력 */}
            <div className='flex-1 flex gap-2'>
              <div className='relative flex-1'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
                <Input
                  value={localQuery}
                  onChange={e => setLocalQuery(e.target.value)}
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
        {paginatedProducts.length > 0 ? (
          <>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
              {paginatedProducts.map(product => (
                <ProductCard key={product.id} product={product} theme='dark' />
              ))}
            </div>

            {/* 페이지네이션 */}
            {totalPages > 1 && (
              <div className='flex justify-center'>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <button
                        onClick={() =>
                          currentPage > 1 && handlePageChange(currentPage - 1)
                        }
                        className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 gap-1 pl-2.5 ${
                          currentPage <= 1
                            ? 'pointer-events-none opacity-50'
                            : 'cursor-pointer'
                        }`}
                        disabled={currentPage <= 1}
                      >
                        이전
                      </button>
                    </PaginationItem>

                    {[...Array(totalPages)].map((_, i) => (
                      <PaginationItem key={i + 1}>
                        <button
                          onClick={() => handlePageChange(i + 1)}
                          className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 cursor-pointer ${
                            currentPage === i + 1
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
                          currentPage < totalPages &&
                          handlePageChange(currentPage + 1)
                        }
                        className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 gap-1 pr-2.5 ${
                          currentPage >= totalPages
                            ? 'pointer-events-none opacity-50'
                            : 'cursor-pointer'
                        }`}
                        disabled={currentPage >= totalPages}
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
