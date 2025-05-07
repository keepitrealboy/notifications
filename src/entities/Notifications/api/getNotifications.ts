import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';
import { NotificationResponse } from '@/shared/types/notifications';
import { API_PATH } from '@/shared/lib/consts';

export const getNotifications = async (limit: number, offset: number) => {
  return await axios
    .get<NotificationResponse>(`${API_PATH}/notifications`, {
      params: { limit, offset },
    })
    .then((res) => res.data);
};

export const useGetNotifications = () => {
  const limit = 4;

  return useInfiniteQuery({
    queryKey: ['notifications'],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => getNotifications(limit, pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.total > lastPage.offset + lastPage.limit
        ? lastPage.offset + limit
        : undefined;
    },
  });
};
