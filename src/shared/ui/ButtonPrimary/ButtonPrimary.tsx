import { FC, HTMLAttributes, ReactNode } from 'react';
import styles from './ButtonPrimary.module.scss';
import clsx from 'clsx';

interface ButtonPrimaryPropsType extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const ButtonPrimary: FC<ButtonPrimaryPropsType> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <button {...rest} className={clsx(styles.ButtonPrimary, className)}>
      {children}
    </button>
  );
};
