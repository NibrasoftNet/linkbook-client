'use client';

/* eslint-disable */
import NavLink from '@/components/link/NavLink';
import { IRoute } from '@/types/types';
import { useParams, usePathname } from 'next/navigation';
import { PropsWithChildren, useCallback } from 'react';
import { useTranslations } from 'use-intl';

interface SidebarLinksProps extends PropsWithChildren {
  routes: IRoute[];
  [x: string]: any;
}

export function SidebarLinks(props: SidebarLinksProps) {
  const pathname = usePathname();
  const params = useParams<{ userId: string }>()
  const { routes } = props;
  const t = useTranslations('Sidebar');
  // verifies if routeName is the one active (in browser input)
  const activeRoute = useCallback(
    (routeName: string) => {
      return pathname?.includes(routeName);
    },
    [pathname],
  );
  // this function creates the links and collapses that appear in the sidebar (left menu)
  const createLinks = (routes: IRoute[]) => {
    return routes.map((route, key) => {
      if (route.disabled) {
        return (
          <div
            key={key}
            className={`flex w-full max-w-full cursor-not-allowed items-center justify-between rounded-lg py-3 pl-8 font-medium`}
          >
            <div className="w-full items-center justify-center">
              <div className="flex w-full items-center justify-center">
                <div
                  className={`text mr-3 mt-1.5 text-zinc-950 opacity-30 dark:text-white`}
                >
                  {route.icon}
                </div>
                <p
                  className={`mr-auto text-sm text-zinc-950 opacity-30 dark:text-white`}
                >
                 {/* @ts-ignore*/}
                  {t(`${route}.name`)}
                </p>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div key={key}>
            <div
              className={`${route.invisible && 'hidden'} flex w-full max-w-full items-center justify-between rounded-lg py-3 pl-8 ${
                activeRoute(route.path.toLowerCase())
                  ? 'bg-primary font-semibold text-white dark:text-zinc-950'
                  : 'font-medium text-zinc-950 dark:text-zinc-400'
              }`}
            >
              <NavLink
                href={route.layout ? route.layout + route.path : `/${params.userId}${route.path}`}
                key={key}
                styles={{ width: '100%' }}
              >
                <div className="w-full items-center justify-center">
                  <div className="flex w-full items-center justify-center">
                    <div
                      className={`text mr-3 mt-1.5 ${
                        activeRoute(route.path.toLowerCase())
                          ? 'font-semibold text-white dark:text-zinc-950'
                          : 'text-zinc-950 dark:text-white'
                      } `}
                    >
                      {route.icon}
                    </div>
                    <p
                      className={`mr-auto text-sm ${
                        activeRoute(route.path.toLowerCase())
                          ? 'font-semibold text-white dark:text-zinc-950'
                          : 'font-medium text-zinc-950 dark:text-zinc-400'
                      }`}
                    >
                      {/* @ts-ignore*/}
                      {t(`${route.name}`)}
                    </p>
                  </div>
                </div>
              </NavLink>
            </div>
          </div>
        );
      }
    });
  };
  // this function creates the links from the secondary accordions (for example auth -> sign-in -> default)
/*  const createAccordionLinks = (routes: IRoute[]) => {
    return routes.map((route: IRoute, key: number) => {
      return (
        <li className="mb-2.5 ml-[28px] flex max-w-full items-center" key={key}>
          <NavLink href={route.layout + route.path} key={key}>
            <p
              className={`text-xs ${
                activeRoute(route.path.toLowerCase()) ? 'font-semibold' : ''
              } ${
                activeRoute(route.path.toLowerCase())
                  ? 'text-zinc-950 dark:text-white'
                  : 'text-zinc-950 dark:text-white'
              }`}
            >
              {route.name}
            </p>
          </NavLink>
        </li>
      );
    });
  };*/
  //  BRAND
  return <>{createLinks(routes)}</>;
}

export default SidebarLinks;
