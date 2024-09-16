import { useQuery } from '@tanstack/react-query';

import { getMyNotificationsList } from '@/actions/notification.actions';
import type { PaginationProps } from '@/types/types';

export function useGetOthersNotifications(paginationParams: PaginationProps) {
  return useQuery({
    queryFn: async () => getMyNotificationsList(paginationParams),
    queryKey: ['my-notifications', paginationParams.page],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchInterval: false,
  });
}
