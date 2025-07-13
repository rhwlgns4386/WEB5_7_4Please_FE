import MyPageTab from '@/routes/mypage/_components/MyPageTab';
import MypageTop from '@/routes/mypage/_components/MypageTop';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/mypage/')({
  component: MyPage,
});

export default function MyPage() {
  return (
    <div className='max-w-[1200px] mx-auto'>
      <MypageTop />
      <MyPageTab />
    </div>
  );
}
