import type { Metadata } from 'next';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getNotifications } from '@/entities/Notifications/api/getNotifications';
import Notifications from '@/pages/Notifications/ui/Notifications';

export const metadata: Metadata = {
  title: 'Уведомления',
  description: 'Страница с уведомлениями',
};

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['notifications'],
    queryFn: () => getNotifications(4, 0),
    initialPageParam: 0,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Notifications />
    </HydrationBoundary>
  );
}
