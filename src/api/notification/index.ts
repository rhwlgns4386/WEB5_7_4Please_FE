import { requests } from '@/lib/axiosConfig';
import type { NotificationFive, NotificationList } from '@/types';
import type { AxiosResponse } from 'axios';

export const createNotification = ({ message }: { message: string }) => {
  return requests({
    url: `/api/v1/notification/push/${message}`,
    method: 'POST',
  });
};

export const updateNotification = ({
  notificationId,
}: {
  notificationId: number;
}) => {
  return requests({
    url: `/api/v1/notification/${notificationId}`,
    method: 'PUT',
  });
};

export const getNotificationList = ({
  page,
  size,
}: {
  page: number;
  size: number;
}): Promise<AxiosResponse<NotificationList>> => {
  return requests({
    url: `/api/v1/notification/view`,
    method: 'GET',
    params: {
      page,
      size,
    },
  });
};

export const getNotificationFive = (): Promise<
  AxiosResponse<NotificationFive>
> => {
  return requests({
    url: `/api/v1/notification/list`,
    method: 'GET',
  });
};
