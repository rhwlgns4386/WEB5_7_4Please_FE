import { StarRating } from '@/components/ui/star-rating';
import DeleteUserConfirmModal from '@/routes/mypage/_components/DeleteUserConfirmModal';
import ModifyUserInfoModal from '@/routes/mypage/_components/ModifyUserInfoModal';

export default function MypageTop() {
  return (
    <div className='px-5 py-10 flex flex-col gap-4'>
      <div className='flex items-center justify-between'>
        <div>
          <div className='flex gap-2'>
            <span className='text-2xl font-bold'>안녕하세요</span>
            <span className='text-2xl font-bold'>김판매님</span>
          </div>
          <span className='text-sm text-muted-foreground'>
            안전하고 투명한 중고 경매 거래
          </span>
        </div>
        <div>
          <div className='flex gap-2 flex-col border border-gray-200 rounded-lg p-4'>
            <div className='flex items-center gap-2 justify-between'>
              <span className='text-sm text-muted-foreground'>신뢰도</span>
              <span className='text-2xl font-bold'>4.5</span>
            </div>
            <StarRating readonly={true} value={4.5} size='sm' />
          </div>
        </div>
      </div>
      <div className='flex gap-2 justify-end'>
        <ModifyUserInfoModal />
        <DeleteUserConfirmModal />
      </div>
    </div>
  );
}
