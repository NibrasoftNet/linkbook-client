import type { ReactNode } from 'react';

import CommunityFeedProvider from '@/providers/CommunityFeedContext';

export default function CommunityFeedLayout(props: { children: ReactNode }) {
  return <CommunityFeedProvider>{props.children}</CommunityFeedProvider>;
}
