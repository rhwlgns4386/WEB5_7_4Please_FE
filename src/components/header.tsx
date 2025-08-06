import { Button } from '@/components/ui/button';
import Logo from '@/assets/logo.svg?react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useUserStore } from '@/store/user';
import useAuth from '@/hooks/useAuth';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { LucideBell } from 'lucide-react';
import {
  useGetNotificationFive,
  useGetNotificationList,
  useUpdateNotification,
} from '@/api/notification';
import { useState } from 'react';
import NotificationListModal from '@/components/notification-list-modal';

export default function Header() {
  const navigate = useNavigate();
  const { accessToken } = useUserStore();
  const { logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const goToRegisterProduct = () => {
    navigate({ to: '/registerProduct' });
  };
  const goToMyPage = () => {
    navigate({ to: '/mypage' });
  };

  const { data: notificationFiveData } = useGetNotificationFive();
  const notificationFive = notificationFiveData?.pushNotificationResponses;

  const {
    data: notificationListData,
    fetchNextPage,
    hasNextPage,
  } = useGetNotificationList();
  const notifications = notificationListData?.pages;

  const { mutate: updateNotification } = useUpdateNotification();

  const handleNotificationClick = (notificationId: number) => {
    // 알림 목록을 평탄화
    console.log(notificationId)
    // 해당 알림 찾기
    const notification = notifications?.find(n => Number(n.id) === notificationId);


    if (!notification) {
      console.warn("Notification not found");
      return;
    }

    updateNotification({ notificationId });

    if(notification.message.url){
      window.location.href = notification.message.url;
    }
  };

  const isAllRead = notificationFive?.every(noti => noti.isRead) ?? true;

  return (
    <div className='w-full flex justify-between items-center py-4 px-8 border-b border-gray-200 fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-950'>
      <Link to='/'>
        <div className='flex items-center gap-2'>
          <Logo />
          <span className='text-2xl font-bold'>Deal4U</span>
          <span className='text-md text-gray-500'>당신을 위한 거래</span>
        </div>
      </Link>

      {accessToken ? (
        <div className='flex items-center gap-2'>
          <Button variant={'outline'} onClick={goToRegisterProduct}>
            판매하기
          </Button>
          <Button variant={'outline'} onClick={goToMyPage}>
            마이페이지
          </Button>
          <Popover>
            <PopoverTrigger className='relative'>
              <LucideBell className='w-5 h-5 cursor-pointer' />
              {!isAllRead && (
                <div className='w-2 h-2 bg-red-500 rounded-full absolute top-0 right-0' />
              )}
            </PopoverTrigger>
            <PopoverContent>
              <div className='flex flex-col gap-1'>
                {notificationFive && notificationFive.length > 0 ? (
                  notificationFive.map(noti => (
                    <div
                      key={noti.id}
                      className={`p-2 rounded cursor-pointer transition-colors ${
                        noti.isRead
                          ? 'hover:bg-gray-100 dark:hover:bg-gray-800'
                          : 'bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100'
                      }`}
                      onClick={() => handleNotificationClick(noti.id)}
                    >
                      <div className='flex items-center gap-2'>
                        {!noti.isRead && (
                          <div className='w-1.5 h-1.5 bg-blue-500 rounded-full' />
                        )}
                        <p
                          className={`text-sm ${
                            noti.isRead
                              ? 'text-gray-500'
                              : 'text-gray-800 dark:text-gray-300'
                          }`}
                        >
                          {noti.data.message}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className='text-sm text-center text-gray-500 py-4'>
                    새로운 알림이 없습니다.
                  </p>
                )}
                <Button
                  variant='ghost'
                  className='w-full mt-2 text-sm text-blue-500 hover:text-blue-600'
                  onClick={() => setIsModalOpen(true)}
                >
                  알림 전체보기
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          <Button variant={'outline'} onClick={logout}>
            로그아웃
          </Button>
        </div>
      ) : (
        <div>
          <Button variant='outline' onClick={() => navigate({ to: '/login' })}>
            <span>로그인</span>
          </Button>
        </div>
      )}
      <NotificationListModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        notifications={notifications}
        onNotificationClick={handleNotificationClick}
        hasNextPage={hasNextPage ?? false}
        fetchNextPage={fetchNextPage}
      />
    </div>
  );
}
