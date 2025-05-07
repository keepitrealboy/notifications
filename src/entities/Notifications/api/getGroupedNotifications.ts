import axios from 'axios';
import {
  NotificationGroupResponse,
  NotificationType,
} from '@/shared/types/notifications';
import { useInfiniteQuery } from '@tanstack/react-query';
import { API_PATH } from '@/shared/lib/consts';

export const getGroupedNotifications = async (
  notificationType: NotificationType,
  targetId: string,
  limit: number,
  offset: number
) => {
  return await axios
    .get<NotificationGroupResponse>(
      `${API_PATH}/notifications/group/${notificationType}/${targetId}`,
      {
        params: { limit, offset },
      }
    )
    .then((res) => res.data);
};

export const useGetGroupedNotifications = (
  notificationType: NotificationType,
  targetId: string
) => {
  const limit = 4;
  return useInfiniteQuery({
    queryKey: ['grouped-notifications'],
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      getGroupedNotifications(notificationType, targetId, limit, pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.total > lastPage.offset + lastPage.limit
        ? lastPage.offset + limit
        : undefined;
    },
    enabled: false,
  });
};
