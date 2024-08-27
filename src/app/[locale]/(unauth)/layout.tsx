import type { ReactNode } from 'react';
import React from 'react';

import NavbarUnsubscribed from '@/components/navbar/NavbarUnsubscribed';

const UnsubscribedLayout = (props: { children: ReactNode }) => {
  return (
    <main className="flex h-screen w-screen flex-col">
      <NavbarUnsubscribed />
      <div className="size-full">{props.children}</div>
    </main>
  );
};

export default UnsubscribedLayout;
