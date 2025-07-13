import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, Upload, Calendar, Clock } from 'lucide-react';
import { createFileRoute } from '@tanstack/react-router';
import {
  Select,
  SelectItem,
  SelectLabel,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DatePicker } from '@/routes/registerProduct/DatePicker';

export const Route = createFileRoute('/registerProduct/')({
  component: RegisterProductPage,
});

export default function RegisterProductPage() {
  const [auctionPeriod, setAuctionPeriod] = useState('3');
  const [category, setCategory] = useState('all');

  return (
    <div className='max-w-2xl mx-auto p-6 space-y-6  min-h-screen'>
      {/* Product Images Section */}
      <Card>
        <CardContent className='p-6'>
          <h2 className='text-xl font-bold mb-2'>상품 이미지</h2>
          <p className='text-gray-600 text-sm mb-4'>
            판매할 이미지 1 장과 최대 4 장의 이미지를 업로드 할 수 있습니다.
          </p>

          <div className='flex gap-4 mb-4'>
            <div className='w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center bg-white cursor-pointer hover:bg-gray-50'>
              <Camera className='w-8 h-8 text-gray-400 mb-2' />
              <span className='text-xs text-gray-500 text-center'>
                썸네일 이미지 추가
              </span>
            </div>
            <div className='w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center bg-white cursor-pointer hover:bg-gray-50'>
              <Camera className='w-8 h-8 text-gray-400 mb-2' />
              <span className='text-xs text-gray-500 text-center'>
                상품 이미지 추가
              </span>
            </div>
          </div>

          <div className='bg-blue-50 border border-blue-200 rounded-lg p-3'>
            <div className='flex items-center gap-2'>
              <Upload className='w-4 h-4 text-blue-600' />
              <span className='text-sm text-blue-800'>
                상품의 실제 상태를 정확히 보여주는 사진을 올려주세요. 더 많은
                입찰을 받을 수 있습니다.
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Basic Information Section */}
      <Card>
        <CardContent className='p-6'>
          <h2 className='text-xl font-bold mb-4'>기본 정보</h2>

          <div className='space-y-4'>
            <div>
              <Label
                htmlFor='product-name'
                className='text-sm font-medium mb-2 block'
              >
                상품명
              </Label>
              <Input
                id='product-name'
                placeholder='상품명을 입력해 주세요.'
                className='w-full'
              />
            </div>

            <div>
              <Label
                htmlFor='product-name'
                className='text-sm font-medium mb-2 block'
              >
                카테고리
              </Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className='w-full'>
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
            </div>

            <div>
              <Label
                htmlFor='description'
                className='text-sm font-medium mb-2 block'
              >
                상품 설명
              </Label>
              <Textarea
                id='description'
                placeholder='상품에 대한 자세한 설명을 입력해 주세요.'
                className='w-full h-32 resize-none'
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transaction Information Section */}
      <Card>
        <CardContent className='p-6'>
          <h2 className='text-xl font-bold mb-4'>거래정보</h2>

          <div className='space-y-4'>
            <div className='flex gap-2'>
              <div className='flex-1'>
                <Label
                  htmlFor='postal-code'
                  className='text-sm font-medium mb-2 block'
                >
                  우편번호
                </Label>
                <Input id='postal-code' className='w-full' />
              </div>
              <Button
                variant='outline'
                className='mt-7 px-4 py-2 bg-gray-600 text-white hover:bg-gray-700'
              >
                주소 검색
              </Button>
            </div>

            <div>
              <Label
                htmlFor='address'
                className='text-sm font-medium mb-2 block'
              >
                주소
              </Label>
              <Input id='address' className='w-full' />
            </div>

            <div>
              <Label
                htmlFor='detailed-address'
                className='text-sm font-medium mb-2 block'
              >
                상세주소
              </Label>
              <Input
                id='detailed-address'
                placeholder='상세주소를 입력해주세요'
                className='w-full'
              />
            </div>

            <div>
              <Label htmlFor='phone' className='text-sm font-medium mb-2 block'>
                핸드폰
              </Label>
              <Input
                id='phone'
                placeholder='010-1234-5678'
                className='w-full'
              />
            </div>
          </div>

          <div className='bg-orange-50 border border-orange-200 rounded-lg p-3 mt-4'>
            <div className='flex items-center gap-2'>
              <span className='text-sm text-orange-800'>
                ⚠️ 경매 시작 후에는 정보를 변경할 수 없습니다. 신중하게
                설정해주세요.
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Start Date and Auction Settings */}
      <Card>
        <CardContent className='p-6'>
          <div className='flex items-center gap-2 mb-4'>
            <Calendar className='w-5 h-5' />
            <h2 className='text-xl font-bold'>시작일</h2>
          </div>
          <DatePicker />

          <div className='border-2 border-red-300 rounded-lg p-4 mb-6'>
            <div className='flex items-center gap-2 mb-3'>
              <Clock className='w-5 h-5' />
              <h3 className='font-bold'>경매 기간</h3>
            </div>
            <RadioGroup
              value={auctionPeriod}
              onValueChange={setAuctionPeriod}
              className='flex gap-6'
            >
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='3' id='3days' />
                <Label htmlFor='3days' className='font-medium'>
                  3일
                </Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='5' id='5days' />
                <Label htmlFor='5days' className='font-medium'>
                  5일
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className='grid grid-cols-2 gap-4 mb-6'>
            <div>
              <Label
                htmlFor='starting-price'
                className='text-sm font-medium mb-2 block'
              >
                경매 시작가 (원)
              </Label>
              <Input
                id='starting-price'
                placeholder='10,000'
                className='w-full text-lg'
              />
            </div>
            <div>
              <Label
                htmlFor='buy-now-price'
                className='text-sm font-medium mb-2 block'
              >
                즉시 입찰가 (원)
              </Label>
              <Input
                id='buy-now-price'
                placeholder='50,000'
                className='w-full text-lg'
              />
            </div>
          </div>

          <Button className='w-full bg-black text-white hover:bg-gray-800 py-3 text-lg font-medium'>
            경매 시작
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
