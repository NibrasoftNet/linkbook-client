'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { PropsWithChildren } from 'react';
import React, { useEffect, useRef } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Scrollbars } from 'react-custom-scrollbars-2';
import { HiOutlineArrowRightOnRectangle } from 'react-icons/hi2';

import { TestimonialDialog } from '@/components/alert-dialog/TestimonialDialog';
import UpgradeCard from '@/components/card/UpgradeCard';
import {
  renderThumb,
  renderTrack,
  renderView,
} from '@/components/scrollbar/Scrollbar';
import Links from '@/components/sidebar/components/Links';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { imagesUrls } from '@/lib/constants';
import { useAuth } from '@/providers/AuthContext';
import { useNavigationLayout } from '@/providers/NavigationLayoutProvider';
import type { IRoute } from '@/types/types';

// import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

export interface SidebarProps extends PropsWithChildren {
  routes: IRoute[];
  [x: string]: any;
}

function Sidebar(props: SidebarProps) {
  const router = useRouter();
  const { session } = useAuth();
  const { open, setOpen } = useNavigationLayout();
  const { routes } = props;

  // Ref for sidebar
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Close sidebar on outside click for mobile screens only
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        window.innerWidth < 1024 // Adjust breakpoint for mobile as needed
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setOpen]);

  // SIDEBAR
  return (
    <aside
      ref={sidebarRef}
      /* eslint-disable-next-line tailwindcss/enforces-negative-arbitrary-values */
      className={`fixed z-[1000] min-h-full w-[300px] transition-all ${
        props.variant === 'auth' ? 'xl:hidden' : 'xl:block'
      } ${open ? '' : '-translate-x-[120%] xl:translate-x-[unset]'}`}
    >
      <Card className="m-3 h-[96.5vh] w-full overflow-hidden !rounded-lg border-zinc-200 pe-4 dark:border-zinc-800 sm:my-4 sm:mr-4 md:m-5 md:mr-[-50px]">
        <Scrollbars
          autoHide
          renderTrackVertical={renderTrack}
          renderThumbVertical={renderThumb}
          renderView={renderView}
        >
          <div className="flex h-full flex-col justify-between">
            <div>
              <Button
                className="absolute top-4 flex h-12 cursor-pointer flex-row bg-white p-0 text-zinc-200 dark:text-white/40"
                onClick={() => setOpen(false)}
              >
                <Image
                  src={imagesUrls.logoImageWithoutText}
                  alt="Image"
                  width="1920"
                  height="1080"
                  className="size-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
                <h1 className="pr-8 text-black">LinkBook</h1>
              </Button>
              {/* <Link
                href="/"
                replace
                className="mt-8 flex cursor-pointer items-center justify-center gap-4"
              >
                <Image
                  src={imagesUrls.logoImage}
                  alt="landing-hero-image"
                  width={40}
                  height={40}
                  unoptimized
                  className="object-contain"
                />
                <h5 className="me-2 text-2xl font-bold leading-5 text-zinc-950 dark:text-white">
                  Linkbook
                </h5>
                <Badge
                  variant="outline"
                  className="my-auto w-max px-2 py-0.5 text-xs text-zinc-950 dark:border-none dark:bg-zinc-800 dark:text-white"
                >
                  User
                </Badge>
              </Link> */}
              {/* <div className="my-8 h-px bg-zinc-200 dark:bg-white/10" /> */}
              <div className="my-8 h-px" />
              {/* Nav item */}
              <ul>
                <Links routes={routes} />
              </ul>
            </div>
            <TestimonialDialog />
            <div className="mt-auto p-4">
              <UpgradeCard />
            </div>
            <div className="mb-9 mt-7">
              {/* Sidebar profile info */}
              <div className="mt-5 flex w-full items-center justify-center rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
                <Link href="/profile">
                  <Avatar className="h-9 min-w-9 rounded-md object-contain shadow-md hover:border md:min-h-10 md:min-w-10">
                    <AvatarImage
                      src={session?.photo || imagesUrls.logoImage}
                      alt="linkbook-logo"
                    />
                    <AvatarFallback className="font-bold dark:text-zinc-950">
                      US
                    </AvatarFallback>
                  </Avatar>
                </Link>
                <Link href="/dashboard/settings">
                  <p className="ml-2 mr-3 flex items-center text-sm font-semibold leading-none text-zinc-950 dark:text-white">
                    {session?.firstName
                      ? `${session?.firstName} ${session?.lastName}`
                      : 'User Not Found'}
                  </p>
                </Link>
                <Button
                  variant="outline"
                  className="ml-auto flex size-[40px] cursor-pointer items-center justify-center rounded-full p-0 text-center text-sm font-medium hover:dark:text-white"
                  onClick={() => {
                    router.push('/');
                  }}
                >
                  <HiOutlineArrowRightOnRectangle
                    className="size-4 stroke-2 text-zinc-950 dark:text-white"
                    width="16px"
                    height="16px"
                    color="inherit"
                  />
                </Button>
              </div>
            </div>
          </div>
        </Scrollbars>
      </Card>
    </aside>
  );
}

// PROPS

export default Sidebar;
