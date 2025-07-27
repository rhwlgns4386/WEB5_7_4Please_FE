import { requests } from '@/lib/axiosConfig';
import type { NotificationFive, NotificationList } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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

// Tanstack Query Hooks

export const useGetNotificationList = (page: number, size: number) => {
  return useQuery({
    queryKey: ['notifications', { page, size }],
    queryFn: () => getNotificationList({ page, size }),
    select: data => data.data,
  });
};

export const useGetNotificationFive = () => {
  return useQuery({
    queryKey: ['notifications', 'five'],
    queryFn: getNotificationFive,
    select: data => data.data,
  });
};

export const useCreateNotification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};

export const useUpdateNotification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};
