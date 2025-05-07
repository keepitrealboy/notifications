import { FC } from 'react';
import styles from './UserMeta.module.scss';
import male from '@/shared/ui/icons/male.svg';
import female from '@/shared/ui/icons/female.svg';
import verification from '@/shared/ui/icons/verification.svg';
import Image from 'next/image';
import { Sex } from '@/shared/types/user';

interface UserMetaPropsType {
  sex: Sex;
  username: string;
  verified?: boolean;
}

export const UserMeta: FC<UserMetaPropsType> = ({
  sex,
  verified,
  username,
}) => {
  const icon = sex === Sex.male ? male : female;
  return (
    <div className={styles.UserMeta}>
      <Image src={icon} alt={sex} width={16} height={16} data-target="user" />
      <a href="#" data-target="user" className={styles.UserMetaUsername}>
        {username}
      </a>
      {verified && (
        <Image
          src={verification}
          alt={'verified'}
          width={16}
          height={16}
          data-target="user"
        />
      )}
    </div>
  );
};
