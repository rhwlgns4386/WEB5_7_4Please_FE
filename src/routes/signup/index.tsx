import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import useAuth from '@/hooks/useAuth';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const Route = createFileRoute('/signup/')({
  component: RouteComponent,
  validateSearch: z.object({
    token: z.string().optional(),
  }),
  staticData: {
    hideHeader: true,
  },
});

function RouteComponent() {
  const navigate = useNavigate();
  const { token } = Route.useSearch();
  const { signupMutation } = useAuth();

  const formSchema = z.object({
    nickname: z
      .string()
      .min(2, { message: '닉네임은 2자 이상 20자 이하로 입력해주세요.' })
      .max(20, { message: '닉네임은 2자 이상 20자 이하로 입력해주세요.' })
      .regex(/^[a-zA-Z0-9_가-힣]+$/, {
        message: '닉네임은 한글, 영문, 숫자, 밑줄(_)만 사용할 수 있습니다.',
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickname: '',
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    if (token) {
      signupMutation({
        token,
        nickName: values.nickname,
      });
    } else {
      // 토큰이 없을 경우의 예외 처리
      console.error('Signup token is missing.');
    }
  };

  const goToHome = () => {
    navigate({ to: '/' });
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-4xl font-bold mb-8'>회원가입</h1>
      <Card className='w-full max-w-lg'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold text-center'>
            Deal4U
          </CardTitle>
          <div className='flex flex-col gap-2 text-center'>
            <CardDescription className='text-lg text-white'>
              사는 놈이 가격을 정한다!
            </CardDescription>
            <CardDescription>
              입찰로 만나는 공정한 중고거래, Deal4U에서 시작하세요.
            </CardDescription>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className='flex flex-col gap-2 text-center'>
          <span className='text-lg font-bold'>등록되지 않은 회원입니다.</span>
          <span className='text-sm text-gray-500'>
            계정을 생성하시겠습니까?
          </span>
        </CardContent>
        <CardFooter className='flex-col gap-2'>
          <Dialog>
            <Form {...form}>
              <DialogTrigger asChild className='w-full'>
                <Button
                  variant='default'
                  className='w-full bg-orange-500 hover:bg-orange-600 text-white font-bold'
                >
                  가입하기
                </Button>
              </DialogTrigger>
              <Button variant={'outline'} className='w-full' onClick={goToHome}>
                다음에 하기
              </Button>
              <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                  <DialogTitle>닉네임 설정</DialogTitle>
                  <DialogDescription>
                    다른 사용자들에게 보여질 닉네임을 설정해주세요.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                  <FormField
                    control={form.control}
                    name='nickname'
                    render={({ field }) => (
                      <div className='grid gap-4'>
                        <div className='grid gap-3'>
                          <FormLabel>닉네임</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder='닉네임을 입력하세요'
                            />
                          </FormControl>
                          <FormMessage />
                          <FormDescription>
                            2-20자, 한글/영문/숫자/언더스코어(_) 사용 가능
                          </FormDescription>
                        </div>
                      </div>
                    )}
                  />
                  <DialogFooter className='mt-4'>
                    <DialogClose asChild>
                      <Button variant='outline'>취소</Button>
                    </DialogClose>
                    <Button
                      type='submit'
                      variant={'secondary'}
                      className='bg-orange-500 hover:bg-orange-600'
                    >
                      닉네임설정 완료
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Form>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  );
}
