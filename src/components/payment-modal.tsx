import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import {
  LucideHammer,
  LucideIdCard,
  LucideMapPin,
  LucideShieldCheck,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import type { MyBid, OrderInfo } from '@/types';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { useCreateOrder } from '@/api/order';

interface Props {
  orderInfo: OrderInfo
  isOpen: boolean;
  onClose: () => void;
}

const formSchema = z.object({
  name: z.string().min(2, '이름은 2자 이상 입력해주세요.'),
  phone: z
    .string()
    .regex(/^010-\d{4}-\d{4}$/, '010-0000-0000 형식으로 입력해주세요.'),
  postalCode: z.string().min(5, '우편번호를 입력해주세요.'),
  address: z.string().min(1, '주소를 입력해주세요.'),
  addressDetail: z.string().min(1, '상세주소를 입력해주세요.'),
  request: z.string().optional(),
  isBidAgree: z
    .boolean()
    .refine(val => val === true, '경매 이용약관에 동의해주세요.'),
  isPersonalInfoAgree: z
    .boolean()
    .refine(val => val === true, '개인정보 수집 및 이용에 동의해주세요.'),
});

export default function PaymentModal({orderInfo,isOpen, onClose }: Props) {
  const [isAddressSearchOpen, setIsAddressSearchOpen] = useState(false);
  const { mutateAsync: createOrder } = useCreateOrder();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      postalCode: '',
      address: '',
      addressDetail: '',
      request: '',
      isBidAgree: false,
      isPersonalInfoAgree: false,
    },
  });

  const handleCreateInstantOrder = async () => {
    try {
      const orderId = await createOrder({
        auctionId: Number(orderInfo.auctionId),
        type: orderInfo.type,
        data: {
          price: orderInfo.amount,
        },
      });
      console.log(orderId);
      return String(orderId.data.orderId);
    } catch (error) {
      console.error('주문 생성 실패:', error);
      throw error;
    }
  };


  const handleFormSubmit = async (data: z.infer<typeof formSchema>) => {

    const orderId = await handleCreateInstantOrder();
    console.log("주문 : " + orderId)

    onClose(); // 토스 결제창 열기 전에 현재 모달을 닫습니다.

    const tossPayments = await loadTossPayments(
      import.meta.env.VITE_TOSS_TEST_CLIENT_KEY
    );

    tossPayments.requestPayment('카드', {
      amount: orderInfo.amount,
      // orderId: `${bidInfo.auctionId}-${new Date().getTime()}`,
      orderId: orderId,
      orderName: orderInfo.productName,
      customerName: data.name,
      successUrl: `${window.location.origin}/payment/success`,
      failUrl: `${window.location.origin}/payment/fail`,
    });
  };

  const handleAddressComplete = (data: any) => {
    // 우편번호와 주소를 폼에 설정
    form.setValue('postalCode', data.zonecode);
    form.setValue('address', data.address);
    form.setFocus('addressDetail');

    // 주소 검색 팝업 닫기
    setIsAddressSearchOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='min-w-[1000px]'>
        <DialogHeader>
          <DialogTitle>경매결제</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          낙찰된 상품의 결제를 진행해주세요.
        </DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)}>
            <div className='flex gap-8 overflow-y-auto max-h-[550px]'>
              <div className='flex flex-col gap-10'>
                <div className='p-4 pb-10 rounded-lg border border-gray-200 flex flex-col gap-5 min-w-[500px]'>
                  <div className='flex items-center gap-2'>
                    <LucideHammer className='w-5 h-5' />
                    <span>낙찰상품</span>
                  </div>
                  <div className='flex w-full justify-between items-end'>
                    <div className='flex gap-4 items-center'>
                      <img
                        src={orderInfo.thumbnailUrl}
                        alt='상품 이미지'
                        className='w-20 h-20 rounded-lg object-cover'
                      />
                      <div className='flex flex-col gap-4'>
                        <span className='text-lg font-bold'>
                          {orderInfo.productName}
                        </span>
                        <span className='text-sm text-gray-700 bg-gray-300 rounded-xl px-3 py-1'>
                          판매자: {orderInfo.sellerNickName}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className='text-2xl font-bold text-blue-400'>
                        {orderInfo.amount.toLocaleString()}원
                      </span>
                    </div>
                  </div>
                </div>

                <div className='p-4 pb-10 rounded-lg border border-gray-200 flex flex-col gap-5 min-w-[500px]'>
                  <div className='flex flex-col gap-4'>
                    <div className='flex items-center gap-2'>
                      <LucideMapPin className='w-5 h-5' />
                      <span>배송정보</span>
                    </div>
                    <div className='flex gap-4'>
                      <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                          <FormItem className='w-full'>
                            <FormLabel>받는 분</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder='이름을 입력하세요'
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
                          <FormItem className='w-full'>
                            <FormLabel>연락처</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder='010-0000-0000' />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className='flex gap-4 items-end'>
                      <FormField
                        control={form.control}
                        name='postalCode'
                        render={({ field }) => (
                          <FormItem className='w-full'>
                            <FormLabel>우편번호</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder='우편번호'
                                readOnly
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type='button'
                        variant={'outline'}
                        onClick={() => setIsAddressSearchOpen(true)}
                      >
                        주소 검색
                      </Button>
                    </div>
                    <FormField
                      control={form.control}
                      name='address'
                      render={({ field }) => (
                        <FormItem className='w-full'>
                          <FormLabel>주소</FormLabel>
                          <FormControl>
                            <Input {...field} readOnly />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='addressDetail'
                      render={({ field }) => (
                        <FormItem className='w-full'>
                          <FormLabel>상세주소</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder='상세주소를 입력해주세요'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='request'
                      render={({ field }) => (
                        <FormItem className='w-full'>
                          <FormLabel>배송 요청사항</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder='배송 요청사항을 입력하세요 (예: 부재 시 경비실에 맡겨주세요)'
                              className='resize-none'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-4 rounded-lg p-4 w-[380px] shadow-md bg-accent'>
                <div className='flex flex-col gap-4'>
                  <span className='text-lg font-bold'>결제 요약</span>
                  <div className='flex items-center w-full justify-between'>
                    <span>낙찰가</span>
                    <span>{orderInfo.amount.toLocaleString()}원</span>
                  </div>
                  <Separator className='my-2 bg-gray-400' />
                  <div className='flex items-center w-full justify-between'>
                    <span>총 결제금액</span>
                    <span className='text-lg font-bold text-blue-400'>
                      {orderInfo.amount.toLocaleString()}원
                    </span>
                  </div>
                  <div className='flex flex-col gap-3 mt-2'>
                    <FormField
                      control={form.control}
                      name='isBidAgree'
                      render={({ field }) => (
                        <FormItem className='flex items-center gap-2'>
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className='text-sm text-gray-300'>
                            경매 이용약관 및 결제 약관에 동의합니다.(필수)
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='isPersonalInfoAgree'
                      render={({ field }) => (
                        <FormItem className='flex items-center gap-2'>
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className='text-sm text-gray-300'>
                            개인정보 수집 및 이용에 동의합니다.(필수)
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button
                    className='w-full text-lg font-semibold text-white mt-6'
                    size={'lg'}
                    type='submit'
                  >
                    {orderInfo.amount.toLocaleString()}원 결제하기
                  </Button>
                  <Card className='bg-blue-500/40 rounded-none mt-6 shadow-none'>
                    <CardTitle className='flex items-center gap-2 px-5'>
                      <LucideShieldCheck className='w-5 h-5 text-blue-300' />
                      <span className='text-lg font-bold text-blue-300'>
                        안전 결제 보장
                      </span>
                    </CardTitle>
                    <CardContent>
                      <span>
                        결재 정보는 암호화되어 안전하게 처리되며, 상품 수령 확인
                        후 판매자에게 대금이 지급됩니다.
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </form>
        </Form>

        {/* 주소 검색 팝업 */}
        {isAddressSearchOpen && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
            <div className='bg-white rounded-lg p-4 w-[500px] h-[600px] relative'>
              <div className='flex justify-between items-center mb-4'>
                <h3 className='text-lg font-semibold'>주소 검색</h3>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => setIsAddressSearchOpen(false)}
                >
                  ✕
                </Button>
              </div>
              <DaumPostcode
                onComplete={handleAddressComplete}
                style={{ width: '100%', height: '500px' }}
              />
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
