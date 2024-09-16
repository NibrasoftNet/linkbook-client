'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';

import { getProfileAction } from '@/actions/auth.actions';
import SparklesText from '@/components/magicui/sparkles-text';
import type { SessionProps } from '@/types/auth.type';
import useNotificationTokenStore from '@/zustand/notificationTokenStore';

const RedirectPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const accessToken = searchParams.get('token');
  if (!accessToken) {
    router.push('/sign-up');
  }
  const { token } = useNotificationTokenStore();
  const { isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      try {
        const session: SessionProps = await getProfileAction({
          accessToken: accessToken as string,
          token: token as string,
        });
        if (session) {
          router.push(`/${session.user.id}/dashboard`);
        }
      } catch (error) {
        router.push('/sign-up');
      }
    },

    enabled: !!accessToken,
  });

  return <section>{isLoading && <SparklesText text="Linkbook" />}</section>;
};

export default RedirectPage;
