'use client';
import { FC } from 'react';
import Image from 'next/image';
import styles from './NotificationImage.module.scss';

interface NotificationImagePropsType {
  image: string | null;
}

export const NotificationImage: FC<NotificationImagePropsType> = ({
  image,
}) => {
  if (!image) {
    return null;
  }
  return (
    <Image
      src={image}
      alt="notification image"
      width={48}
      height={48}
      className={styles.Image}
    />
  );
};
