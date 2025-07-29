import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { StarRating } from '@/components/ui/star-rating';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useCreateReview } from '@/api/review';

const reviewSchema = z.object({
  rating: z
    .number()
    .min(0.5, { message: '최소 0.5점 이상 평가해주세요.' })
    .max(5, { message: '최대 5점까지 평가할 수 있습니다.' }),
  review: z
    .string()
    .max(100, { message: '리뷰는 100자 이하로 작성해주세요.' })
    .optional(),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

export function SellerReviewModal() {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    mode: 'onChange',
    defaultValues: {
      rating: 0,
      review: '',
    },
  });

  const { mutate: createReview } = useCreateReview();

  const handleSubmit = (data: ReviewFormData) => {
    createReview({
      auctionId: 7,
      rating: data.rating,
      content: data.review || '',
    });

    setIsOpen(false);
    form.reset();
  };

  const handleCancel = () => {
    setIsOpen(false);
    form.reset();
  };

  const currentRating = form.watch('rating');
  const getRatingText = (rating: number) => {
    if (rating === 0) return '평가해주세요';
    if (rating <= 1) return '매우 불만족';
    if (rating <= 2) return '불만족';
    if (rating <= 3) return '보통';
    if (rating <= 4) return '만족';
    return '매우 만족';
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant='outline'>리뷰 남기기</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <DialogHeader>
              <DialogTitle>판매자(닉네임)</DialogTitle>
              <DialogDescription>
                판매자 리뷰 작성
                <br />
                구매하신 상품과 판매자 서비스에 대한 솔직한 리뷰를 남겨주세요.
              </DialogDescription>
            </DialogHeader>
            <Separator />

            <div className='flex flex-col gap-4 py-4'>
              <FormField
                control={form.control}
                name='rating'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>전체 만족도</FormLabel>
                    <div className='flex gap-3 items-center'>
                      <FormControl>
                        <StarRating
                          value={field.value}
                          onChange={field.onChange}
                          size='lg'
                        />
                      </FormControl>
                      <span className='text-sm text-gray-600 min-w-[80px]'>
                        {getRatingText(currentRating)}
                      </span>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='review'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>상세리뷰 (선택사항)</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className='resize-none min-h-[100px]'
                        maxLength={100}
                        placeholder='판매자와의 거래 경험을 자세히 알려주세요. 다른 구매자들에게 도움이 되는 정보를 공유해주세요'
                      />
                    </FormControl>
                    <div className='text-xs text-gray-500 text-right'>
                      {field.value?.length || 0}/100
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator />

              <div className='flex flex-col gap-2'>
                <span className='text-md font-bold'>구매 상품</span>
                <div className='flex gap-2 items-center'>
                  <div className='w-20 h-20 rounded-lg overflow-hidden'>
                    <img
                      src={'https://picsum.photos/200/300'}
                      alt='review-image'
                      className='w-full h-full object-cover'
                    />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <span className='text-md font-bold'>맥북 프로 M2</span>
                    <span className='text-sm text-gray-500'>
                      2024.01.15 구매
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button type='button' variant='outline' onClick={handleCancel}>
                취소
              </Button>
              <Button
                type='submit'
                variant='secondary'
                className='bg-orange-500 hover:bg-orange-700'
                disabled={currentRating === 0}
              >
                리뷰 남기기
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
