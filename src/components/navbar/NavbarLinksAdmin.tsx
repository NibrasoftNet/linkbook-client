'use client';

import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { FiAlignJustify } from 'react-icons/fi';
import {
  HiOutlineArrowRightOnRectangle,
  HiOutlineInformationCircle,
  HiOutlineMoon,
  HiOutlineSun,
} from 'react-icons/hi2';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useTranslations } from 'use-intl';

import LocaleSwitcher from '@/components/LocaleSwitcher';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserProfile } from '@/components/UserProfile';
// import { UserProfile } from '@/components/UserProfile';
import { useAuth } from '@/providers/AuthContext';
import { useNavigationLayout } from '@/providers/NavigationLayoutProvider';

export default function HeaderLinks() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { setOpen } = useNavigationLayout();
  const auth = useAuth();
  const t = useTranslations('Help&support');
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleUserLogout = async () => {
    await auth.logout();
  };

  return (
    <div className="relative flex min-w-max max-w-max grow items-center justify-around gap-1 rounded-lg md:p-2 md:pl-3 xl:gap-2">
      <Button
        variant="outline"
        className="flex h-9 min-w-9 cursor-pointer rounded-full border-zinc-200 p-0 text-xl text-zinc-950 dark:border-zinc-800 dark:text-white md:min-h-10 md:min-w-10 xl:hidden"
        onClick={() => setOpen((prev) => !prev)}
      >
        <FiAlignJustify className="size-4" />
      </Button>
      <Button
        variant="outline"
        className="flex h-9 min-w-9 cursor-pointer rounded-full border-zinc-200 p-0 text-xl text-zinc-950 dark:border-zinc-800 dark:text-white md:min-h-10 md:min-w-10"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        {theme === 'light' ? (
          <HiOutlineMoon className="size-4 stroke-2" />
        ) : (
          <HiOutlineSun className="size-5 stroke-2" />
        )}
      </Button>

      {/* Dropdown Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex h-9 min-w-9 cursor-pointer rounded-full border-zinc-200 p-0 text-xl text-zinc-950 dark:border-zinc-800 dark:text-white md:min-h-10 md:min-w-10"
          >
            <HiOutlineInformationCircle className="size-[20px] text-zinc-950 dark:text-white" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 p-2">
          <a target="blank" href="mailto:contact@skaners.fr">
            <Button variant="outline" className="mb-2 w-full">
              {t('help_and_support')}
            </Button>
          </a>
          <a target="blank" href="/#faqs">
            <Button variant="outline" className="w-full">
              {t('faq_and_more')}
            </Button>
          </a>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        variant="outline"
        className="flex h-9 min-w-9 cursor-pointer rounded-full border-zinc-200 p-0 text-xl text-zinc-950 dark:border-zinc-800 dark:text-white md:min-h-10 md:min-w-10"
        onClick={handleUserLogout}
      >
        <HiOutlineArrowRightOnRectangle className="size-4 stroke-2 text-zinc-950 dark:text-white" />
      </Button>
      <LocaleSwitcher />
      <UserProfile />
    </div>
  );
}
