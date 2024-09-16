import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { NotificationTypeProps } from '@/types/notification.type';

export function NotificationCard({
  notification,
}: {
  notification: NotificationTypeProps;
}) {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>{notification.title}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">{notification.message}</CardContent>
    </Card>
  );
}
