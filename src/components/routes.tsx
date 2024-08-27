// Auth Imports
import {
  HiOutlineAcademicCap,
  HiOutlineCog8Tooth,
  HiOutlineCpuChip,
  HiOutlineCreditCard,
  HiOutlineCurrencyDollar,
  HiOutlineHome,
  HiOutlineShoppingBag,
} from 'react-icons/hi2';
import { PiSwapBold } from 'react-icons/pi';
import { TbMapPinSearch } from 'react-icons/tb';

import type { IRoute } from '@/types/types';

export const routes: IRoute[] = [
  {
    name: 'main_dashboard',
    path: '/dashboard',
    // eslint-disable-next-line tailwindcss/enforces-negative-arbitrary-values
    icon: <HiOutlineHome className="-mt-[7px] size-6 stroke-2 text-inherit" />,
    collapse: false,
    disabled: false,
  },
  {
    name: 'donations',
    path: '/donations/details',
    icon: (
      <HiOutlineAcademicCap className="-mt-[7px] size-6 stroke-2 text-inherit" />
    ),
    collapse: false,
    disabled: false,
  },
  {
    name: 'swaps',
    path: '/swaps',
    icon: <PiSwapBold className="-mt-[7px] size-6 stroke-2 text-inherit" />,
    collapse: false,
    disabled: false,
  },
  {
    name: 'marketplace',
    path: '/marketplace',
    icon: (
      <HiOutlineShoppingBag className="-mt-[7px] size-6 stroke-2 text-inherit" />
    ),
    collapse: false,
    disabled: false,
    invisible: false,
  },
  {
    name: 'search',
    path: '/search',
    icon: <TbMapPinSearch className="-mt-[7px] size-6 stroke-2 text-inherit" />,
    collapse: false,
    disabled: false,
    invisible: false,
  },
  {
    name: 'ai_assistant',
    path: '/ai-chat',
    icon: (
      <HiOutlineCpuChip className="-mt-[7px] size-6 stroke-2 text-inherit" />
    ),
    collapse: false,
    disabled: false,
    invisible: true,
  },
  {
    name: 'profile_settings',
    path: '/profile',
    icon: (
      <HiOutlineCog8Tooth className="-mt-[7px] size-6 stroke-2 text-inherit" />
    ),
    collapse: false,
    disabled: false,
  },
  {
    name: 'subscription',
    path: '/subscription',
    icon: (
      <HiOutlineCreditCard className="-mt-[7px] size-4 stroke-2 text-inherit" />
    ),
    collapse: false,
    disabled: false,
    invisible: true,
  },
  {
    name: 'pricing_page',
    path: '/pricing',
    icon: (
      <HiOutlineCurrencyDollar className="-mt-[7px] size-4 stroke-2 text-inherit" />
    ),
    collapse: false,
    disabled: false,
    invisible: true,
  },
];
