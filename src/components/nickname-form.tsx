import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useAuth from '@/hooks/useAuth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { Route } from '@/routes/auth/google';

const formSchema = z.object({
  nickName: z.string().min(1),
});

export default function NicknameForm({ token }: { token: string }) {
  const { code, state } = Route.useSearch();
  console.log(code, state);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickName: '',
    },
  });

  const { signupMutation } = useAuth();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    signupMutation({
      token,
      nickName: values.nickName,
    });
  };

  return (
    <Card className='w-[600px] p-12'>
      <CardHeader className='flex flex-col items-center justify-center'>
        <CardTitle className='text-2xl font-bold'>Deal4U</CardTitle>
        <CardTitle className='text-2xl font-bold'>닉네임 설정</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col items-center justify-center'>
        <CardDescription className='text-md font-bold'>
          다른 사용자들에게 보여질 닉네임을 설정해주세요
        </CardDescription>
      </CardContent>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col gap-4'
        >
          <FormField
            control={form.control}
            name='nickName'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-md font-bold'>닉네임</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className='text-white font-bold bg-orange-500 hover:bg-orange-600 w-full'
            type='submit'
          >
            닉네임 설정 완료
          </Button>
        </form>
      </Form>
    </Card>
  );
}
