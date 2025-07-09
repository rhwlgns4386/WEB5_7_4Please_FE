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
import { useState } from 'react';
import { useRouter } from '@tanstack/react-router';

export default function Hero() {
  const router = useRouter();
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (category && category !== 'all') {
      params.set('category', category);
    }
    if (query.trim()) {
      params.set('query', query.trim());
    }

    const searchString = params.toString();
    const url = `/products/${searchString ? '?' + searchString : ''}`;

    router.navigate({ to: url });
  };

  return (
    <section className='bg-gradient-to-r from-gray-800 to-gray-900 py-16 relative overflow-hidden'>
      <div className='absolute inset-0 bg-gradient-to-r from-gray-800/10 to-orange-400/10'></div>
      <div className='container mx-auto px-4 relative'>
        <div className='max-w-4xl mx-auto text-center'>
          <h1 className='text-5xl md:text-7xl font-bold mb-6 text-white animate-fade-in'>
            Deal4U
          </h1>
          <p className='text-xl md:text-2xl mb-8 text-gray-300 animate-fade-in-delay'>
            <span className='text-orange-400 font-bold'>
              사는 놈이 가격을 정한다!
            </span>
            <br />
            입찰로 만나는 공정한 중고거래, Deal4U에서 시작하세요
          </p>
          <div className='max-w-3xl mx-auto animate-fade-in-delay-2'>
            <div className='flex flex-col sm:flex-row gap-4 items-center'>
              <Select value={category} onValueChange={setCategory}>
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
              <div className='flex-1 relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
                <Input
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSearch()}
                  placeholder='찾고 있는 상품을 검색해보세요...'
                  className='pl-10 h-12 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-orange-500 transition-all duration-300 hover:bg-gray-750'
                />
              </div>
              <Button
                onClick={handleSearch}
                size='lg'
                className='bg-orange-600 hover:bg-orange-700 h-12 px-8 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg'
              >
                검색하기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
