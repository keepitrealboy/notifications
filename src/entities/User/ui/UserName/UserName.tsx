import { FC } from 'react';
import styles from './UserName.module.scss';

interface UserNamePropsType {
  name: string;
}

export const UserName: FC<UserNamePropsType> = ({ name }) => {
  return (
    <p className={styles.UserName} data-target="user">
      {name}
    </p>
  );
};
