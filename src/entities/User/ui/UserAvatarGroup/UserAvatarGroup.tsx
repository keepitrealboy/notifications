import { FC } from 'react';
import { User } from '@/shared/types/user';
import styles from './UserAvatarGroup.module.scss';
import Image from 'next/image';

interface UserAvatarGroupPropsType {
  avatars: Pick<User, 'avatar' | 'name'>[];
}

export const UserAvatarGroup: FC<UserAvatarGroupPropsType> = ({ avatars }) => {
  return (
    <div className={styles.UserAvatarGroup}>
      {avatars.map(({ avatar, name }, index) => {
        return (
          <Image
            key={name}
            src={avatar}
            alt={name}
            width={28}
            height={28}
            data-target="user"
            className={styles.UserAvatarGroupImage}
            style={
              index === 0
                ? {
                    border: '1px solid var(--main-background)',
                  }
                : {}
            }
          />
        );
      })}
    </div>
  );
};
