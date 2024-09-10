'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React from 'react';

import { useAuth } from '@/providers/AuthContext';

const NavbarItemsLanding = () => {
  const t = useTranslations('Landing');
  const auth = useAuth();

  // Define your links and their translations dynamically
  const navItems = [
    { key: t('landing_community'), path: 'community' },
    { key: t('landing_donations'), path: 'donations' },
    { key: t('landing_swaps'), path: 'swaps' },
    { key: t('landing_products'), path: 'products' },
    { key: t('landing_profile'), path: 'profile' },
  ];

  return (
    <ul className="flex size-full flex-col items-center gap-8 md:flex-row">
      {navItems.map((item) => (
        <Link
          key={item.key}
          href={auth.session ? `/${auth.session.id}/${item.path}` : '/sign-in'}
          className="cursor-pointer capitalize"
        >
          <span className="underline-hover">{item.key}</span>
        </Link>
      ))}
    </ul>
  );
};

export default NavbarItemsLanding;
