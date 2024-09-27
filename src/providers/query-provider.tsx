'use client';

// eslint-disable-next-line import/no-extraneous-dependencies
import {
  isServer,
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from '@tanstack/react-query';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { ReactNode } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ErrorBoundary } from 'react-error-boundary';
import { MdWifiTetheringError } from 'react-icons/md';

import { Button } from '@/components/ui/button';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
        refetchInterval: 4 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  }
  // Browser: make a new query client if we don't already have one
  // This is very important, so we don't re-make a new client if React
  // suspends during the initial render. This may not be needed if we
  // have a suspense boundary BELOW the creation of the query client
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}

export default function TanstackQueryProvider({
  children,
}: {
  children: ReactNode;
}) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools buttonPosition="bottom-left" />
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            /* eslint-disable-next-line react/no-unstable-nested-components */
            fallbackRender={({ error, resetErrorBoundary }) => (
              <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
                <MdWifiTetheringError className="size-40 text-primary" />
                <div className="flex w-full flex-col items-center justify-center">
                  <h1 className="my-2 text-2xl font-bold text-gray-800">
                    Website temporarily unavailable
                  </h1>
                  <p className="my-2 text-gray-800">
                    Sorry about that! Please visit us later.
                  </p>
                </div>
                <Button
                  className="my-2 rounded border bg-indigo-600 px-8 py-4 text-center text-white hover:bg-indigo-700 focus:opacity-50 focus:outline-none focus:ring-2 focus:ring-indigo-700 sm:w-full lg:w-auto"
                  onClick={() => resetErrorBoundary()}
                >
                  Try again
                </Button>
                <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
              </div>
            )}
            onReset={reset}
          >
            {children}
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </QueryClientProvider>
  );
}
