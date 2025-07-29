import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import type { NotificationList } from '@/types';
import { Button } from './ui/button';

interface NotificationListModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationList['content'] | undefined;
  onNotificationClick: (notificationId: number) => void;
  hasNextPage: boolean;
  fetchNextPage: () => void;
}

export default function NotificationListModal({
  isOpen,
  onClose,
  notifications,
  onNotificationClick,
  hasNextPage,
  fetchNextPage,
}: NotificationListModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-h-[80vh] flex flex-col'>
        <DialogHeader>
          <DialogTitle>전체 알림</DialogTitle>
          <DialogDescription>모든 알림 내역을 확인합니다.</DialogDescription>
        </DialogHeader>
        <div className='flex-1 flex flex-col gap-2 mt-4 overflow-y-auto'>
          {notifications && notifications.length > 0 ? (
            notifications.map(noti => (
              <div
                key={noti.notificationId}
                className={`p-3 rounded-md cursor-pointer transition-colors ${
                  noti.isRead
                    ? 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200'
                    : 'bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100'
                }`}
                onClick={() => onNotificationClick(noti.notificationId)}
              >
                <div className='flex items-center gap-2'>
                  {!noti.isRead && (
                    <div className='w-2 h-2 bg-blue-500 rounded-full' />
                  )}
                  <p
                    className={`text-sm ${
                      noti.isRead
                        ? 'text-gray-500'
                        : 'text-gray-800 dark:text-gray-300'
                    }`}
                  >
                    {noti.message}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className='text-center text-gray-500 py-8'>알림이 없습니다.</p>
          )}
        </div>
        {hasNextPage && (
          <Button onClick={() => fetchNextPage()} className='mt-4'>
            더보기
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}
