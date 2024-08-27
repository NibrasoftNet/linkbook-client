'use client';

import { useTheme } from 'next-themes';
import React from 'react';
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';

import { Button } from '@/components/ui/button';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
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
  );
}
