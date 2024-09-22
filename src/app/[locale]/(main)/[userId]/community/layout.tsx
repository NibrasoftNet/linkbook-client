import type { ReactNode } from 'react';

import CommunityProvider from '@/providers/CommunityContext';

export default function CommunityLayout(props: { children: ReactNode }) {
  return <CommunityProvider>{props.children}</CommunityProvider>;
}
