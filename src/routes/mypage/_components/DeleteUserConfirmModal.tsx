import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { useDeleteMember } from '@/api/auth';

export default function DeleteUserConfirmModal() {
  const [inputValue, setInputValue] = useState('');
  const isConfirmationValid = inputValue === '회원탈퇴';
  const { mutate: deleteMember } = useDeleteMember();

  const handleCancel = () => {
    setInputValue('');
  };

  const handleWithdraw = () => {
    if (isConfirmationValid) {
      deleteMember();
      setInputValue('');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'destructive'}>회원탈퇴</Button>
      </DialogTrigger>
      <DialogContent className='w-full max-w-md p-0'>
        <DialogHeader className='p-6 pb-4'>
          <div className='flex items-center gap-3 mb-4'>
            <DialogTitle className='text-lg font-semibold text-white'>
              회원탈퇴
            </DialogTitle>
          </div>
          <p className='text-gray-500 text-base'>
            정말로 회원탈퇴를 진행하시겠습니까?
          </p>
        </DialogHeader>

        <div className='px-6 pb-6 space-y-6'>
          <div className='bg-red-50 p-4 rounded-lg'>
            <div className='flex items-center gap-2 mb-3'>
              <AlertTriangle className='w-5 h-5 text-red-500' />
              <h3 className='font-medium text-red-600'>주의사항</h3>
            </div>
            <ul className='space-y-2 text-sm text-gray-700'>
              <li className='flex items-start gap-2'>
                <span className='text-red-400 mt-1'>•</span>
                <span>모든 입찰내역 이 삭제됩니다</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-red-400 mt-1'>•</span>
                <span>등록한 판매 상품 이 모두 삭제됩니다</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-red-400 mt-1'>•</span>
                <span>저장한 관심 목록 이 모두 삭제됩니다</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-red-400 mt-1'>•</span>
                <span>탈퇴 후에는 복구가 불가능 합니다</span>
              </li>
            </ul>
          </div>

          <div className='space-y-3'>
            <p className='text-sm text-gray-500'>
              탈퇴를 진행하려면{' '}
              <span className='text-red-500 font-medium'>'회원탈퇴'</span>를
              입력해주세요
            </p>
            <Input
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder='회원탈퇴'
              className='w-full text-white'
            />
          </div>

          <div className='flex gap-3 pt-4'>
            <DialogClose asChild>
              <Button
                variant='outline'
                className='flex-1 text-gray-600 border-gray-300 hover:bg-gray-50 bg-transparent'
                onClick={handleCancel}
              >
                취소
              </Button>
            </DialogClose>
            <Button
              className={`flex-1 ${
                isConfirmationValid
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              disabled={!isConfirmationValid}
              onClick={handleWithdraw}
            >
              탈퇴하기
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
