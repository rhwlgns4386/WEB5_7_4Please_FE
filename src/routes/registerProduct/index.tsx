import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, Upload, Calendar, Clock, LucideX } from 'lucide-react';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DatePicker } from '@/routes/registerProduct/DatePicker';
import { GridPattern } from '@/components/ui/grid-pattern';
import useImageUpload from '@/routes/registerProduct/hooks/useImageUpload';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import type { Address } from 'react-daum-postcode';
import AddressSearchModal from '@/components/address-search-modal';

export const Route = createFileRoute('/registerProduct/')({
  component: RegisterProductPage,
});

export default function RegisterProductPage() {
  const {
    thumbnailRef,
    productImagesRef,
    thumbnailUrl,
    productImagesUrl,
    handleThumbnailUpload,
    handleProductImagesUpload,
    handleThumbnailChange,
    handleThumbnailRemove,
    handleProductImagesChange,
    handleProductImagesRemove,

    form,
    handleFormSubmit,
    isUploading,
  } = useImageUpload();

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const handleAddressComplete = (data: Address) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    form.setValue('zipCode', data.zonecode);
    form.setValue('address', fullAddress);
    form.setFocus('addressDetail');
    setIsAddressModalOpen(false);
  };

  return (
    <div className='relative'>
      <div className='absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]'>
        <GridPattern />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)}>
          <div className='max-w-3xl mx-auto p-6 space-y-6 min-h-screen relative'>
            <Card>
              <CardContent className='p-6'>
                <h2 className='text-xl font-bold mb-2'>상품 이미지</h2>
                <p className='text-gray-400 text-sm mb-4'>
                  판매할 이미지 1 장과 최대 4 장의 상품 이미지를 업로드 할 수
                  있습니다.
                </p>

                <div className='flex gap-4 mb-4'>
                  {thumbnailUrl ? (
                    <div className='relative ring-3 ring-orange-500 rounded-lg'>
                      <img
                        src={thumbnailUrl}
                        alt='thumbnail'
                        className='w-32 h-32 object-cover rounded-lg'
                      />
                      <Button
                        type='button'
                        variant='secondary'
                        className='absolute top-2 right-2 rounded-full bg-black/50 hover:bg-black/70 w-4 h-6 p-2'
                        onClick={handleThumbnailRemove}
                      >
                        <LucideX className='w-2 h-2' />
                      </Button>
                    </div>
                  ) : (
                    <div
                      className='w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center bg-white cursor-pointer hover:bg-gray-50'
                      onClick={handleThumbnailUpload}
                    >
                      <Camera className='w-8 h-8 text-gray-400 mb-2' />
                      <span className='text-xs text-gray-500 text-center'>
                        썸네일 이미지 추가
                      </span>
                      <input
                        type='file'
                        ref={thumbnailRef}
                        hidden
                        accept='image/*'
                        onChange={handleThumbnailChange}
                      />
                    </div>
                  )}
                  {productImagesUrl.map((url, index) => (
                    <div key={index} className='relative'>
                      <img
                        src={url}
                        alt={`product-image-${index}`}
                        className='w-32 h-32 object-cover rounded-lg'
                      />
                      <Button
                        type='button'
                        variant='secondary'
                        className='absolute top-2 right-2 rounded-full bg-black/50 hover:bg-black/70 w-4 h-6 p-2'
                        onClick={() => handleProductImagesRemove(index)}
                      >
                        <LucideX className='w-2 h-2' />
                      </Button>
                    </div>
                  ))}
                  {productImagesUrl.length < 4 && (
                    <div
                      className='w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center bg-white cursor-pointer hover:bg-gray-50'
                      onClick={handleProductImagesUpload}
                    >
                      <Camera className='w-8 h-8 text-gray-400 mb-2' />
                      <span className='text-xs text-gray-500 text-center'>
                        상품 이미지 추가 ({productImagesUrl.length}/4)
                      </span>
                      <input
                        type='file'
                        ref={productImagesRef}
                        hidden
                        multiple
                        accept='image/*'
                        onChange={handleProductImagesChange}
                      />
                    </div>
                  )}
                </div>

                <div className='bg-blue-50 border border-blue-200 rounded-lg p-3'>
                  <div className='flex items-center gap-2'>
                    <Upload className='w-4 h-4 text-blue-600' />
                    <span className='text-sm text-blue-800'>
                      상품의 실제 상태를 정확히 보여주는 사진을 올려주세요. 더
                      많은 입찰을 받을 수 있습니다.
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className='p-6'>
                <h2 className='text-xl font-bold mb-4'>기본 정보</h2>

                <div className='space-y-4'>
                  <FormField
                    control={form.control}
                    name='productName'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>상품명</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='상품명을 입력해 주세요.'
                            className='w-full'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='categoryId'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>카테고리</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className='w-full'>
                              <SelectValue placeholder='카테고리 선택' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value='1'>패션</SelectItem>
                            <SelectItem value='2'>전자제품</SelectItem>
                            <SelectItem value='3'>스포츠</SelectItem>
                            <SelectItem value='4'>가구</SelectItem>
                            <SelectItem value='5'>생활용품</SelectItem>
                            <SelectItem value='6'>기타</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='description'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>상품 설명</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder='상품에 대한 자세한 설명을 입력해 주세요.'
                            className='w-full h-32 resize-none'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className='p-6'>
                <h2 className='text-xl font-bold mb-4'>거래정보</h2>

                <div className='space-y-4'>
                  <div className='flex gap-2'>
                    <FormField
                      control={form.control}
                      name='zipCode'
                      render={({ field }) => (
                        <FormItem className='flex-1'>
                          <FormLabel>우편번호</FormLabel>
                          <FormControl>
                            <Input placeholder='12345' {...field} readOnly />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type='button'
                      variant='outline'
                      className='mt-7 px-4 py-2 bg-gray-600 text-white hover:bg-gray-700'
                      onClick={() => setIsAddressModalOpen(true)}
                    >
                      주소 검색
                    </Button>
                  </div>

                  <FormField
                    control={form.control}
                    name='address'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>주소</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='주소를 입력해주세요'
                            {...field}
                            readOnly
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='addressDetail'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>상세주소</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='상세주소를 입력해주세요'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='phone'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>핸드폰</FormLabel>
                        <FormControl>
                          <Input placeholder='010-1234-5678' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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

            <Card>
              <CardContent className='p-6'>
                <div className='flex items-center gap-2 mb-4'>
                  <Calendar className='w-5 h-5' />
                  <h2 className='text-xl font-bold'>시작일</h2>
                </div>

                <div className='flex gap-2'>
                  <FormField
                    control={form.control}
                    name='startDate'
                    render={({ field }) => (
                      <FormItem className='mb-6'>
                        <FormControl>
                          <DatePicker
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='startTime'
                    render={({ field }) => (
                      <FormItem className='mb-6'>
                        <FormControl>
                          <Input
                            value={field.value}
                            onChange={field.onChange}
                            type='time'
                            step={'1'}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className='border-2 border-red-300 rounded-lg p-4 mb-6'>
                  <div className='flex items-center gap-2 mb-3'>
                    <Clock className='w-5 h-5' />
                    <h3 className='font-bold'>경매 기간</h3>
                  </div>
                  <FormField
                    control={form.control}
                    name='bidPeriod'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            value={field.value}
                            onValueChange={field.onChange}
                            className='flex gap-6'
                          >
                            <div className='flex items-center space-x-2'>
                              <RadioGroupItem value='THREE' id='3days' />
                              <Label htmlFor='3days' className='font-medium'>
                                3일
                              </Label>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <RadioGroupItem value='FIVE' id='5days' />
                              <Label htmlFor='5days' className='font-medium'>
                                5일
                              </Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className='grid grid-cols-2 gap-4 mb-6'>
                  <FormField
                    control={form.control}
                    name='startingPrice'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>경매 시작가 (원)</FormLabel>
                        <FormControl>
                          <Input
                            type='number'
                            placeholder='10000'
                            className='w-full text-lg'
                            {...field}
                            onChange={e =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='buyNowPrice'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>즉시 입찰가 (원)</FormLabel>
                        <FormControl>
                          <Input
                            type='number'
                            placeholder='50000'
                            className='w-full text-lg'
                            {...field}
                            onChange={e =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type='submit'
                  className='w-full bg-black text-white hover:bg-gray-800 py-3 text-lg font-medium'
                  disabled={isUploading}
                >
                  {isUploading ? '이미지 업로드 중...' : '경매 시작'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </form>
      </Form>
      <AddressSearchModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        onComplete={handleAddressComplete}
      />
    </div>
  );
}
