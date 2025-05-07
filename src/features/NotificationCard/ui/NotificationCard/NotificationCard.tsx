import styles from './NotificationCard.module.scss';
import { Notification, NotificationType } from '@/shared/types/notifications';
import { FC } from 'react';
import clsx from 'clsx';
import { NotificationCardProps } from '@/features/NotificationCard/lib/types';
import { UserAvatar } from '@/entities/User/ui/UserAvatar/UserAvatar';
import { NotificationText } from '@/entities/Notifications/ui/NotificationText/NotificationText';
import { NotificationTime } from '@/entities/Notifications/ui/NotificationTime/NotificationTime';
import { NotificationMoreButton } from '@/entities/Notifications/ui/NotificationMoreButton/NotificationMoreButton';
import Image from 'next/image';
import { NotificationImage } from '@/entities/Notifications/ui/NotificationImage/NotificationImage';
import { UserName } from '@/entities/User/ui/UserName/UserName';
import { UserMeta } from '@/entities/User/ui/UserMeta/UserMeta';
import { NotificationSubscribeButton } from '@/entities/Notifications/ui/NotificationSubscribeButton/NotificationSubscribeButton';

interface NotificationPropsType extends NotificationCardProps {
  notification: Notification;
}

export const NotificationCard: FC<NotificationPropsType> = ({
  notification,
  className,
  onClick,
}) => {
  const { user, type } = notification;
  return (
    <div className={clsx(styles.Card, className)} onClick={onClick}>
      <div className={styles.CardUserBlock}>
        <div className={styles.CardUserData}>
          <UserAvatar
            storiesCount={user.stories?.total_count}
            src={user.avatar}
            isOnline={user.online}
          />
          <div className={styles.CardUserMeta}>
            <UserName name={user.name} />
            <UserMeta sex={user.sex} username={user.username} />
          </div>
        </div>
        <div className={styles.CardActions}>
          <NotificationTime time={notification.created} />
          <NotificationMoreButton />
        </div>
      </div>
      <div className={styles.CardInfo}>
        <NotificationText notification={notification} />
        {type === NotificationType.subscription ? (
          <NotificationSubscribeButton />
        ) : (
          <NotificationImage image={notification.image} />
        )}
      </div>
    </div>
  );
};
