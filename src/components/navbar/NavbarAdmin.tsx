'use client';

/* eslint-disable */
import AdminNavbarLinks from './NavbarLinksAdmin';
import NavLink from '@/components/link/NavLink';
import { useEffect } from 'react';
import {getActiveRoute, isWindowAvailable} from "@/utils/navigation";
import {routes} from "@/components/routes";
import {usePathname} from "next/navigation";
import {useNavigationLayout} from "@/providers/NavigationLayoutProvider";
import { useTranslations } from 'use-intl';

export default function Navbar() {
  const { setScrolled } = useNavigationLayout();
const pathname = usePathname()
  const t = useTranslations('Sidebar');
  const brandText = getActiveRoute(routes, pathname)
  useEffect(() => {
    isWindowAvailable() && window.addEventListener('scroll', changeNavbar);

    return () => {
      isWindowAvailable() && window.removeEventListener('scroll', changeNavbar);
    };
  });
  // const { brandText, userDetails, onOpen } = props;
  const changeNavbar = () => {
    if (isWindowAvailable() && window.scrollY > 1) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  return (
    <nav
      className={`fixed right-3 top-3 z-20 flex w-[calc(100vw_-_6%)] flex-row items-center justify-between rounded-lg bg-white/30 py-2 backdrop-blur-xl transition-all dark:bg-transparent md:right-[30px] md:top-4 md:w-[calc(100vw_-_8%)] md:p-2 lg:w-[calc(100vw_-_6%)] xl:top-[20px] xl:w-[calc(100vw_-_365px)] 2xl:w-[calc(100vw_-_380px)]`}
    >
      <div className="ml-[6px] hidden min-[390px]:block">
        <div className="h-6 md:mb-2 md:w-[224px] md:pt-1">
          <a
            className="hidden text-xs font-normal text-zinc-950 hover:underline dark:text-white dark:hover:text-white md:inline"
            href="/"
          >
            Pages
            <span className="mx-1 text-xs text-zinc-950 hover:text-zinc-950 dark:text-white">
              {' '}
              /{' '}
            </span>
          </a>
          <NavLink
            className="text-xs font-normal text-zinc-950 hover:underline dark:text-white dark:hover:text-white"
            href="#"
          >
            {/* @ts-ignore */}
            {t(brandText)}
          </NavLink>
        </div>
        <p className="text-md shrink capitalize text-zinc-950 dark:text-white md:text-3xl">
          <NavLink
            href="#"
            className="font-bold capitalize hover:text-zinc-950 dark:hover:text-white"
          >
            {/* @ts-ignore */}
            {t(brandText)}
          </NavLink>
        </p>
      </div>
      <div className="w-[154px] min-w-max md:ml-auto md:w-[unset]">
        <AdminNavbarLinks
        />
      </div>
    </nav>
  );
}
