'use client';

import { FC } from 'react';
import styles from './TabBar.module.scss';
import clsx from 'clsx';
import { useTabs } from '@/shared/context/TabContext';

interface TabBarItemPropsType {
  label: string;
  index: number;
}

interface TabBarPropsType {
  items: TabBarItemPropsType[];
  defaultIndex?: number;
}

export const TabBar: FC<TabBarPropsType> = ({ items }) => {
  const { activeTab, setActiveTab } = useTabs();

  return (
    <nav>
      <ul className={styles.TabBar}>
        {items.map(({ index, label }) => (
          <li
            key={index}
            className={clsx(styles.TabBarItem, {
              [styles.TabBarItemActive]: index === activeTab,
            })}
            role="button"
            onClick={() => setActiveTab(index)}
          >
            <span>{label}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
};
