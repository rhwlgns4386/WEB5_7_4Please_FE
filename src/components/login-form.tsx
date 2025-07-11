import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Logo from '@/assets/logo.svg?react';
import NaverLogo from '@/assets/naverLogo.svg?react';
import KakaoLogo from '@/assets/kakaoLogo.svg?react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('flex flex-col gap-6 min-w-[500px] p-8', className)}
      {...props}
    >
      <Card>
        <CardHeader className='text-center'>
          <div className='flex items-center gap-2 justify-center'>
            <Logo />
            <CardTitle className='text-xl'>Deal4U</CardTitle>
          </div>
          <CardDescription>사는놈이 가격을 정한다!</CardDescription>
          <CardDescription>
            입찰로 만나는 공정한 중고거래, Deal4U에서 시작하세요.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className='grid gap-6'>
              <div className='flex flex-col gap-4'>
                <Button variant='outline' className='w-full'>
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
                    <path
                      d='M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z'
                      fill='currentColor'
                    />
                  </svg>
                  구글로 로그인
                </Button>
                <Button variant='outline' className='w-full'>
                  <KakaoLogo />
                  카카오로 로그인
                </Button>
                <Button variant='outline' className='w-full'>
                  <NaverLogo />
                  네이버로 로그인
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
