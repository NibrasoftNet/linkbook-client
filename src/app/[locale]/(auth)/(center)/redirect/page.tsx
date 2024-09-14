'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';

import { getProfileAction } from '@/actions/auth.actions';
import SparklesText from '@/components/magicui/sparkles-text';
import type { SessionProps } from '@/types/auth.type';

const RedirectPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  if (!token) {
    router.push('/sign-up');
  }
  const { isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      try {
        const session: SessionProps = await getProfileAction(token as string);
        if (session) {
          router.push(`/${session.user.id}/dashboard`);
        }
      } catch (error) {
        router.push('/sign-up');
      }
    },
    enabled: !!token,
  });

  return <section>{isLoading && <SparklesText text="Linkbook" />}</section>;
};

export default RedirectPage;
