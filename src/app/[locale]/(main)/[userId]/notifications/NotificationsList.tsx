'use client';

import React from 'react';

import { NotificationCard } from '@/components/card/NotificationCard';
import CardsPagination from '@/components/pagination/CardsPagination';
import { useGetOthersNotifications } from '@/tanstack/notification.query';
import type { NotificationTypeProps } from '@/types/notification.type';
import type { PaginationProps } from '@/types/types';

const NotificationsList = ({
  searchParams,
}: {
  searchParams: PaginationProps;
}) => {
  const { data, isPlaceholderData } = useGetOthersNotifications({
    page: searchParams.page,
    limit: searchParams.limit,
  });
  if (!data.result.data) return <>No Notifications Available</>;
  return (
    <section className="flex size-full min-h-[700px] flex-col items-center justify-between gap-4">
      <ul className="grid size-full grid-cols-1 md:grid-cols-3">
        {data?.result.data.map((notification: NotificationTypeProps) => (
          <li
            key={notification.id}
            // eslint-disable-next-line tailwindcss/no-custom-classname
            className="bg-primary-50 flex items-center justify-center"
          >
            <NotificationCard notification={notification} />
          </li>
        ))}
      </ul>
      <CardsPagination
        searchParams={searchParams}
        meta={data.result.meta}
        isPlaceholderData={isPlaceholderData}
      />
    </section>
  );
};

export default NotificationsList;
