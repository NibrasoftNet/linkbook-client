import type { ReactNode } from 'react';

import DonationProvider from '@/providers/DonationContext';

export default function DonationLayout(props: { children: ReactNode }) {
  return <DonationProvider>{props.children}</DonationProvider>;
}
