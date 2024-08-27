import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React from 'react';

const NavbarItemsLanding = () => {
  const t = useTranslations('Landing');
  return (
    <ul className="flex size-full items-center gap-8">
      <Link href="/" className="cursor-pointer capitalize hover:underline">
        <span>{t('landing_welcome')}</span>
      </Link>
      <Link href="/" className="cursor-pointer capitalize hover:underline">
        <span>{t('landing_shop')}</span>
      </Link>
      <Link href="/" className="cursor-pointer capitalize hover:underline">
        <span>{t('landing_community')}</span>
      </Link>
      <Link href="/" className="cursor-pointer capitalize hover:underline">
        <span>{t('landing_pack_promo')}</span>
      </Link>
      <Link href="/" className="cursor-pointer capitalize hover:underline">
        <span>{t('landing_exposition')}</span>
      </Link>
      <Link href="/" className="cursor-pointer capitalize hover:underline">
        <span>{t('landing_profile')}</span>
      </Link>
    </ul>
  );
};

export default NavbarItemsLanding;
