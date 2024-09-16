import type { User } from '@/types/users.type';

export type NotificationTypeProps = {
  id: number;
  title: string;
  message: string;
  forAllUsers: boolean;
  typeOfSending: NotificationTypeOfSendingEnum;
  punctualSendDate: Date;
  scheduledNotification: Date[];
  active: boolean;
  users: User[];
};

export enum NotificationTypeOfSendingEnum {
  IMMEDIATELY = 'IMMEDIATELY',
  PUNCTUAL = 'PUNCTUAL',
  PROGRAMMED = 'PROGRAMMED',
}
