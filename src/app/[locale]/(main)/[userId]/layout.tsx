import type { ReactNode } from 'react';

import Navbar from '@/components/navbar/NavbarAdmin';
import { routes } from '@/components/routes';
import Sidebar from '@/components/sidebar/Sidebar';

export default function DashboardLayout(props: { children: ReactNode }) {
  return (
    <div className="dark:bg-background-900 flex size-full">
      <Sidebar routes={routes} />
      <div className="size-full dark:bg-zinc-950">
        <main className="flex-none transition-all dark:bg-zinc-950 xl:ml-[328px]">
          <div className="mx-auto min-h-screen !pt-[90px] md:!pt-[118px]">
            {props.children}
          </div>
          <Navbar />
        </main>
      </div>
    </div>
  );
}
