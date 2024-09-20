import { Globe, LifeBuoy, LogOut, User } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useTranslations } from 'use-intl';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { imagesUrls } from '@/lib/constants';
import { useAuth } from '@/providers/AuthContext';

export function UserProfile() {
  const { session, logout } = useAuth();
  const t = useTranslations('ProfileNav');
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-9 min-w-9 rounded-md object-contain shadow-md hover:border md:min-h-10 md:min-w-10">
          <AvatarImage
            src={session?.photo || imagesUrls.logoImage}
            alt="linkbook-logo"
          />
          <AvatarFallback className="font-bold dark:text-zinc-950">
            US
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{t('my_account')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 size-4" />
            <Link href={`/${session?.id}/profile`}>{t('my_profile')}</Link>
            {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
          </DropdownMenuItem>
          {/* <DropdownMenuItem>
            <Settings className="mr-2 size-4" />
            <Link href="/profile/#security">Settings</Link>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> 
          </DropdownMenuItem> */}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Globe className="mr-2 size-4" />
          <span>{t('website')}</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LifeBuoy className="mr-2 size-4" />
          <span>{t('support')}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 size-4" />
          <button type="button" onClick={() => logout()}>
            {t('logout')}
          </button>
          {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
