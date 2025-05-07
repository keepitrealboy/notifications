import { FC, HTMLAttributes, ReactNode } from 'react';
import styles from './Chip.module.scss';
import clsx from 'clsx';

interface ChipPropsType extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const Chip: FC<ChipPropsType> = ({ children, className, ...rest }) => {
  return (
    <button className={clsx(styles.Chip, className)} {...rest}>
      <span>{children}</span>
    </button>
  );
};
