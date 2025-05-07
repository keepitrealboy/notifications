import styles from './NotificationText.module.scss';
import {
  GroupedNotification,
  Notification,
} from '@/shared/types/notifications';
import { FC } from 'react';
import { isGroupedNotification } from '@/entities/Notifications/lib/getNotificationType';

interface NotificationTextPropsType {
  notification: Notification | GroupedNotification;
  onClickGrouped?: () => void;
}

export const NotificationText: FC<NotificationTextPropsType> = ({
  notification,
  onClickGrouped,
}) => {
  if (isGroupedNotification(notification)) {
    return (
      <p className={styles.Text}>
        И ещё{' '}
        <span data-target="show-more" onClick={onClickGrouped}>
          +{notification.other_count} пользователей{' '}
        </span>
        {notification.text}
      </p>
    );
  }
  return <p className={styles.Text}>{notification.text}</p>;
};
