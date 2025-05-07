'use client';

import { GroupedNotification } from '@/shared/types/notifications';
import { FC, useCallback, useMemo, useState } from 'react';
import { UserAvatarGroup } from '@/entities/User/ui/UserAvatarGroup/UserAvatarGroup';
import { UserName } from '@/entities/User/ui/UserName/UserName';
import { UserMeta } from '@/entities/User/ui/UserMeta/UserMeta';
import styles from './GroupedNotificationCard.module.scss';
import { NotificationTime } from '@/entities/Notifications/ui/NotificationTime/NotificationTime';
import { NotificationMoreButton } from '@/entities/Notifications/ui/NotificationMoreButton/NotificationMoreButton';
import clsx from 'clsx';
import { NotificationCardProps } from '@/features/NotificationCard/lib/types';
import { NotificationText } from '@/entities/Notifications/ui/NotificationText/NotificationText';
import { NotificationImage } from '@/entities/Notifications/ui/NotificationImage/NotificationImage';
import { useGetGroupedNotifications } from '@/entities/Notifications/api/getGroupedNotifications';
import { Notification } from '@/features/NotificationCard/ui/Notification';
import { Chip } from '@/shared/ui/Chip/Chip';
import cardStyles from '../Notification.module.scss';
import { useQueryClient } from '@tanstack/react-query';
import { Dots } from '@/shared/ui/icons/components/Dots';

interface GroupedNotificationCardPropsType extends NotificationCardProps {
  notification: GroupedNotification;
}

export const GroupedNotificationCard: FC<GroupedNotificationCardPropsType> = ({
  notification,
  className,
  onClick,
}) => {
  const [isGrouped, setIsGrouped] = useState(true);
  const { users } = notification;

  const queryClient = useQueryClient();

  const { fetchNextPage, hasNextPage, isFetchingNextPage, isFetching, data } =
    useGetGroupedNotifications(notification.type, notification.target_id!);

  const ungroupedList = useMemo(
    () => data?.pages.flatMap((page) => page.results) ?? [],
    [data]
  );

  const handleClickGrouped = useCallback(async () => {
    if (!isFetchingNextPage && !isFetching) {
      await fetchNextPage();
    }
    setIsGrouped(false);
  }, [fetchNextPage, isFetching, isFetchingNextPage]);

  const handleClickUngroup = useCallback(() => {
    queryClient.removeQueries({ queryKey: ['grouped-notifications'] });
    setIsGrouped(true);
  }, [queryClient]);

  const handleLoadMore = useCallback(() => {
    if (!isFetchingNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [fetchNextPage, isFetching, isFetchingNextPage]);

  if (!isGrouped) {
    return (
      <div className={cardStyles.CardGroup}>
        <Chip className={styles.CardCollapse} onClick={handleClickUngroup}>
          Свернуть похожие
        </Chip>
        {ungroupedList.map((item) => (
          <Notification notification={item} key={item.user.name} />
        ))}
        {hasNextPage && (
          <div className={styles.CardLoadMore} onClick={handleLoadMore}>
            <Chip>
              <Dots /> Загрузить еще
            </Chip>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={clsx(styles.Card, className)} onClick={onClick}>
      <div className={styles.CardUserBlock}>
        <div className={styles.CardUserInfo}>
          <UserAvatarGroup
            avatars={users.map((user) => ({
              avatar: user.avatar,
              name: user.name,
            }))}
          />
          <div className={styles.CardUsersList}>
            {users.map((user) => (
              <div key={user.name} className={styles.CardUsersData}>
                <UserName name={user.name} />
                <UserMeta sex={user.sex} username={user.username} />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.CardActions}>
          <NotificationTime time={notification.created} />
          <NotificationMoreButton />
        </div>
      </div>
      <div className={styles.CardInfo}>
        <NotificationText
          notification={notification}
          onClickGrouped={handleClickGrouped}
        />
        <NotificationImage image={notification.image} />
      </div>
    </div>
  );
};
