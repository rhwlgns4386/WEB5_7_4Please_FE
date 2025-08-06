import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Logo from '@/assets/logo.svg?react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import GoogleLogo from '@/assets/googleIcon.svg?react';
import NaverLogo from '@/assets/naverLogo.svg?react';
import KakaoLogo from '@/assets/kakaoLogo.svg?react';
import useAuth from '@/hooks/useAuth';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const { handleClickGoogleLogin, handleClickNaverLogin } = useAuth();

  return (
    <div
      className={cn('flex flex-col gap-6 min-w-[600px] p-8', className)}
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
                <Button
                  variant='outline'
                  className='w-full h-12'
                  onClick={handleClickGoogleLogin}
                  type='button'
                >
                  <GoogleLogo />
                  구글로 로그인
                </Button>
                {/*<Button variant='outline' className='w-full h-12' type='button'>*/}
                {/*  <KakaoLogo />*/}
                {/*  카카오로 로그인*/}
                {/*</Button>*/}
                <Button
                  variant='outline'
                  className='w-full h-12'
                  onClick={handleClickNaverLogin}
                  type='button'
                >
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
