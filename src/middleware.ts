// eslint-disable-next-line import/no-duplicates
import { createRouteMatcher } from '@clerk/nextjs/server';
import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
// eslint-disable-next-line import/no-duplicates
import createMiddleware from 'next-intl/middleware';

import { getSession, refreshTokenAction } from '@/actions/auth.actions';

import { AppConfig } from './utils/AppConfig';

const intlMiddleware = createMiddleware({
  locales: AppConfig.locales,
  localePrefix: AppConfig.localePrefix,
  defaultLocale: AppConfig.defaultLocale,
});

const isProtectedRoute = createRouteMatcher([
  '/:userId/dashboard(.*)',
  '/:locale/:userId/dashboard(.*)',
]);

export default async function middleware(
  request: NextRequest,
  event: NextFetchEvent,
) {
  const cookiesSession = await getSession();
  if (!cookiesSession) {
    if (isProtectedRoute(request)) {
      const locale =
        request.nextUrl.pathname
          .match(/\/([a-z]{2})(?=\/\d+\/dashboard)/)
          ?.at(1) ?? '';
      const signInUrl = new URL(`${locale}/sign-in`, request.url);
      return NextResponse.redirect(signInUrl);
    }
    return intlMiddleware(request);
  }
  if (cookiesSession && cookiesSession.expires < new Date().getTime()) {
    event.waitUntil(await refreshTokenAction(cookiesSession.refreshToken));
  }
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
