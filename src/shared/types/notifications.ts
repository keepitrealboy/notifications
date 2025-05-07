import { User } from '@/shared/types/user';

export enum NotificationType {
  repost = 'repost',
  like = 'like',
  comment = 'comment',
  subscription = 'subscription',
}

export interface Notification {
  type: NotificationType;
  target_id: string | null;
  user: User;
  text: string;
  created: string;
  image: string | null;
}

export interface GroupedNotification extends Notification {
  users: User[];
  other_count: number;
}

export interface NotificationResponse {
  total: number;
  limit: number;
  offset: number;
  results: (Notification | GroupedNotification)[];
}

export interface NotificationGroupResponse {
  type: NotificationType;
  target_id: string;
  total: number;
  limit: number;
  offset: number;
  results: Notification[];
}
