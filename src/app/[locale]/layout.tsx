// eslint-disable-next-line import/no-extraneous-dependencies
import 'leaflet/dist/leaflet.css';
import '@/styles/global.css';

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, useMessages } from 'next-intl';

import { Toaster } from '@/components/ui/sonner';
import AuthProvider from '@/providers/AuthContext';
import { NavigationLayoutProvider } from '@/providers/NavigationLayoutProvider';
import TanstackQueryProvider from '@/providers/query-provider';
import { ThemeProvider } from '@/providers/theme-provider';
import { AppConfig } from '@/utils/AppConfig';

export const metadata: Metadata = {
  title: 'Linkbook',
  description: 'Linkbook Edtion plateform',
  icons: [
    {
      rel: 'apple-touch-icon',
      url: '/assets/images/logo-LinkBook.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/assets/images/logo-LinkBook.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/assets/images/logo-LinkBook.png',
    },
    {
      rel: 'icon',
      url: '/assets/images/logo-LinkBook.png',
    },
  ],
};

export default function RootLayout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate that the incoming `locale` parameter is valid
  if (!AppConfig.locales.includes(props.params.locale)) notFound();

  // Using internationalization in Client Components
  const messages = useMessages();

  return (
    <html lang={props.params.locale}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <NextIntlClientProvider
            locale={props.params.locale}
            messages={messages}
          >
            <TanstackQueryProvider>
              <AuthProvider>
                <NavigationLayoutProvider>
                  {props.children}
                </NavigationLayoutProvider>
              </AuthProvider>
            </TanstackQueryProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
