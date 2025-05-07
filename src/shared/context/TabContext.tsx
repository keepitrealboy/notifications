'use client';

import {
  createContext,
  FC,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from 'react';

interface TabContextPropsType {
  activeTab: number;
  setActiveTab: (tab: number) => void;
}

interface TabProviderPropsType {
  children: ReactNode;
  defaultIndex?: number;
}

const TabContext = createContext<TabContextPropsType | null>(null);

export const TabProvider: FC<TabProviderPropsType> = ({
  children,
  defaultIndex = 0,
}) => {
  const [activeTab, setActiveTab] = useState(defaultIndex);

  const value = useMemo(
    () => ({
      activeTab,
      setActiveTab,
    }),
    [activeTab]
  );

  return <TabContext.Provider value={value}>{children}</TabContext.Provider>;
};

export const useTabs = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('useTab must be used within a TabProvider');
  }
  return context;
};
