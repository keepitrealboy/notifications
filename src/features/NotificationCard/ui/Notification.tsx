import {
  GroupedNotification,
  Notification as NotificationType,
} from '@/shared/types/notifications';

import { FC, MouseEvent, useCallback } from 'react';
import { GroupedNotificationCard } from './GroupedNotificationCard/GroupedNotificationCard';
import { NotificationCard } from './NotificationCard/NotificationCard';
import styles from './Notification.module.scss';
import { isGroupedNotification } from '@/entities/Notifications/lib/getNotificationType';

interface NotificationCardPropsType {
  notification: NotificationType | GroupedNotification;
  onClickNotification?: () => void;
}

export const Notification: FC<NotificationCardPropsType> = ({
  notification,
}) => {
  const isGrouped = isGroupedNotification(notification);

  const handleClick = useCallback((event: MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    const action = target.closest<HTMLElement>('[data-target]')?.dataset.target;

    switch (action) {
      case 'user':
        console.log('abstract action 1');
        break;
      case 'menu':
        console.log('abstract action 3');
        break;
      case 'show-more':
      default:
        console.log('abstract action 2');
        break;
    }
  }, []);

  if (isGrouped) {
    return (
      <GroupedNotificationCard
        notification={notification}
        className={styles.Card}
        onClick={handleClick}
      />
    );
  }
  return (
    <NotificationCard
      notification={notification}
      className={styles.Card}
      onClick={handleClick}
    />
  );
};
