import {
  GroupedNotification,
  Notification as NotificationType,
} from '@/shared/types/notifications';

export const isGroupedNotification = (
  notification: NotificationType | GroupedNotification
): notification is GroupedNotification => {
  return 'other_count' in notification;
};
