'use client';

import { FC } from 'react';
import avatarFallback from '@/shared/ui/icons/avatar-fallback.svg';
import styles from './UserAvatar.module.scss';
import clsx from 'clsx';
import Image from 'next/image';

import { SegmentsRing } from '@/shared/ui/SegmentsRing/SegmentsRing';

interface UserAvatarPropsType {
  src?: string;
  alt?: string;
  storiesCount?: number;
  isOnline?: boolean;
}

export const UserAvatar: FC<UserAvatarPropsType> = ({
  src,
  alt = '',
  storiesCount,
  isOnline,
}) => {
  const isHasStories = storiesCount && storiesCount > 0;

  const avatarSize = isHasStories ? 40 : 34;

  const className = clsx(styles.UserAvatar, {
    [styles.UserAvatarWithStories]: isHasStories,
  });

  return (
    <div className={styles.UserAvatarContainer}>
      <div className={className}>
        {!src ? (
          <Image
            src={avatarFallback}
            alt="User Avatar"
            className={styles.UserAvatarImage}
            data-target="user"
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            className={styles.UserAvatarImage}
            width={avatarSize}
            height={avatarSize}
            data-target="user"
          />
        )}
      </div>
      {isOnline && (
        <div className={clsx(styles.UserAvatarOnlineStatus, className)}>
          <div />
        </div>
      )}
      {isHasStories && (
        <div className={styles.UserAvatarStories}>
          <SegmentsRing
            segmentsCount={storiesCount}
            size={40}
            strokeWidth={2}
          />
        </div>
      )}
    </div>
  );
};
