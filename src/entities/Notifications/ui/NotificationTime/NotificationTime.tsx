import { FC } from 'react';
import styles from './NotificationTime.module.scss';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';

interface NotificationTimePropsType {
  time: string;
}

export const NotificationTime: FC<NotificationTimePropsType> = ({ time }) => {
  const t = formatDistanceToNow(new Date(time), {
    addSuffix: false,
    locale: ru,
  });
  return <span className={styles.NotificationTime}>{t}</span>;
};
