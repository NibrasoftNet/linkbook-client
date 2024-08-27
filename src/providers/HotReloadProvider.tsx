'use client';

import { useRouter } from 'next/navigation';
import React, { useLayoutEffect } from 'react';

import { useAuth } from '@/providers/AuthContext';

export default function HotReloadProvider(props: {
  children: React.ReactNode;
}) {
  const auth = useAuth();
  const router = useRouter();
  useLayoutEffect(() => {
    const reloadedSession = auth.session ? auth.session : auth.refresh();
    if (!reloadedSession) {
      router.push('/sign-in');
    }
  }, []);
  return <main>{props.children}</main>;
}
