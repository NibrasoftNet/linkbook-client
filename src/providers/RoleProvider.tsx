import '@/styles/global.css';

import { redirect } from 'next/navigation';
import React from 'react';

import { getSession } from '@/actions/auth.actions';
import { RoleEnum } from '@/types/users.type';

export default async function RoleProvider(props: {
  children: React.ReactNode;
}) {
  const cookiesSession = await getSession();
  if (!cookiesSession) {
    redirect('/sign-in');
  }
  if (cookiesSession.user.role !== RoleEnum.ADMIN) {
    redirect('/forbidden');
  }
  return <main>{props.children}</main>;
}
