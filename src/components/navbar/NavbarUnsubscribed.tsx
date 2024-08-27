'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import LocaleSwitcher from '@/components/LocaleSwitcher';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { imagesUrls } from '@/lib/constants';

import NavbarItemsLanding from '../desktop/NavbarItemsLanding';

export default function NavbarUnsubscribed() {
  return (
    <nav className="sticky top-0 z-20 flex w-full flex-row items-center justify-between border-b-2 border-slate-200 p-4">
      <Link href="/">
        <Image
          src={imagesUrls.logoImage}
          alt="landing-hero-image"
          width={80}
          height={40}
          unoptimized
          className="cursor-pointer object-contain"
        />
      </Link>
      <div className="hidden min-w-max items-center gap-4 text-end md:flex">
        <NavbarItemsLanding />
        <ThemeSwitcher />
        <LocaleSwitcher />
      </div>
    </nav>
  );
}
