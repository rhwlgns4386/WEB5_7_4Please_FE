import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useUpdateNickname } from '@/api/member';

export default function ModifyUserInfoModal() {
  const [nickname, setNickname] = useState('');
  const { mutate: updateNickname } = useUpdateNickname();

  const handleClick = () => {
    updateNickname({ nickName: nickname });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'outline'}>회원정보수정</Button>
      </DialogTrigger>
      <DialogContent className='max-w-md rounded-2xl bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-700 shadow-2xl p-8'>
        <DialogHeader className='relative pb-2'>
          <DialogTitle className='text-xl text-white'>회원정보수정</DialogTitle>
          <DialogDescription className='text-sm text-gray-300 mt-1'>
            닉네임을 변경할 수 있습니다.
          </DialogDescription>
        </DialogHeader>
        <div className='flex flex-col py-6'>
          <Label htmlFor='nickname' className='text-gray-200 mb-2 text-base'>
            닉네임
          </Label>
          <Input
            id='nickname'
            value={nickname}
            onChange={e => setNickname(e.target.value)}
            className='w-full bg-gray-800 border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500'
            placeholder='새 닉네임 입력'
            autoFocus
          />
        </div>
        <div className='flex justify-end gap-2 mt-4'>
          <DialogClose asChild>
            <Button variant='ghost' className='px-5 py-2 rounded-lg'>
              취소
            </Button>
          </DialogClose>
          <Button
            variant={'outline'}
            className='px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow'
            onClick={handleClick}
          >
            저장
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
