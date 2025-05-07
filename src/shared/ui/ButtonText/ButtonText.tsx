import { FC, HTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './ButtonText.module.scss';

interface ButtonTextPropsType extends HTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

export const ButtonText: FC<ButtonTextPropsType> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <button className={clsx(styles.ButtonText, className)} {...rest}>
      <span>{children}</span>
    </button>
  );
};
