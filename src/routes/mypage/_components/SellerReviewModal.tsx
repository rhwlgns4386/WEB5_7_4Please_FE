import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { LucideStar } from 'lucide-react';

export function SellerReviewModal() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant='outline'>리뷰 남기기</Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>판매자(닉네임)</DialogTitle>
            <DialogDescription>
              판매자 리뷰 작성
              <br />
              구매하신 상품과 판매자 서비스에 대한 솔직한 리뷰를 남겨주세요.
            </DialogDescription>
          </DialogHeader>
          <Separator />
          <div className='flex flex-col gap-2'>
            <span>전체 만족도</span>
            <div className='flex gap-2 items-center'>
              <div className='flex gap-1'>
                <LucideStar fill='yellow' stroke='yellow' />
                <LucideStar />
                <LucideStar />
                <LucideStar />
                <LucideStar />
              </div>
              <span>평가해주세요</span>
            </div>
            <span>상세리뷰 (선택사항)</span>
            <Textarea
              className='resize-none min-h-[100px]'
              maxLength={100}
              placeholder='판매자와의 거래 경험을 자세히 알려주세요. 다른 구매자들에게 도움이 되는 정보를 공유해주세요'
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
                  <span className='text-sm text-gray-500'>2024.01.15 구매</span>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline'>취소</Button>
            </DialogClose>
            <Button
              type='submit'
              variant={'secondary'}
              className='bg-orange-500 hover:bg-orange-700'
            >
              리뷰 남기기
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
