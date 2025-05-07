'use client';

import styles from './Notifications.module.scss';
import { TabProvider } from '@/shared/context/TabContext';
import { TabBar } from '@/shared/ui/TabBar/TabBar';
import { NotificationsList } from '@/widgets/NotificationsList/ui/NotificationsList';
import { ThemeToggle } from '@/shared/ui/ThemeToggle/ThemeToggle';

const tabBarItems = [
  { label: 'Все', index: 0 },
  { label: 'Действия', index: 1 },
  { label: 'Упоминания', index: 2 },
];

const Notifications = () => {
  return (
    <main>
      <section className={styles.Notifications}>
        <header className={styles.Header}>
          <h1 className={styles.NotificationsTitle}>Уведомления</h1>
          <ThemeToggle />
        </header>

        <TabProvider>
          <TabBar items={tabBarItems} />
          <NotificationsList />
        </TabProvider>
      </section>
    </main>
  );
};

export default Notifications;
