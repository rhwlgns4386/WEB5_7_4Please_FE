import { LoginForm } from '@/components/login-form';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/login')({
  component: Login,
  staticData: {
    hideHeader: true,
  },
});

function Login() {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <LoginForm />
    </div>
  );
}
