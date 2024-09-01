import type { ReactNode } from 'react';

import SwapProvider from '@/providers/SwapContext';

export default function SwapLayout(props: { children: ReactNode }) {
  return <SwapProvider>{props.children}</SwapProvider>;
}
