'use client';

import { useGetNotifications } from '@/entities/Notifications/api/getNotifications';
import { Notification } from '@/features/NotificationCard/ui/Notification';
import { useTabs } from '@/shared/context/TabContext';
import { useCallback, useMemo } from 'react';
import { NotificationType } from '@/shared/types/notifications';
import styles from './NotificationsList.module.scss';
import { Chip } from '@/shared/ui/Chip/Chip';
import { Dots } from '@/shared/ui/icons/components/Dots';

export const NotificationsList = () => {
  const { activeTab } = useTabs();
  const { data, hasNextPage, isFetchingNextPage, isFetching, fetchNextPage } =
    useGetNotifications();

  const notificationsList = useMemo(
    () =>
      data?.pages
        .flatMap((page) => page.results)
        .filter((item) => {
          switch (activeTab) {
            case 0:
              return true;
            case 1:
              return [
                NotificationType.like,
                NotificationType.repost,
                NotificationType.subscription,
              ].includes(item.type);
            case 2:
              return item.type === NotificationType.comment;
            default:
              return true;
          }
        }) ?? [],
    [activeTab, data?.pages]
  );

  const handleLoadMore = useCallback(() => {
    if (!isFetchingNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [fetchNextPage, isFetching, isFetchingNextPage]);

  return (
    <ul className={styles.List}>
      {notificationsList.map((notification) => {
        return (
          <Notification
            key={notification.user.name}
            notification={notification}
          />
        );
      })}
      {hasNextPage && (
        <li className={styles.ListLoadMore} onClick={handleLoadMore}>
          <Chip>
            <Dots /> Загрузить еще
          </Chip>
        </li>
      )}
    </ul>
  );
};
