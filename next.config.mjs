/* eslint-disable import/no-extraneous-dependencies, import/extensions */
import { fileURLToPath } from 'node:url';

import withBundleAnalyzer from '@next/bundle-analyzer';
import createJiti from 'jiti';
import withNextIntl from 'next-intl/plugin';

const jiti = createJiti(fileURLToPath(import.meta.url));

jiti('./src/libs/Env');

const withNextIntlConfig = withNextIntl('./src/libs/i18n.ts');

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default bundleAnalyzer(
  withNextIntlConfig({
    eslint: {
      dirs: ['.'],
    },
    output: 'standalone',
    productionBrowserSourceMaps: false,
    poweredByHeader: false,
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'backend.linkbook.store',
          port: '',
          pathname: '/',
        },
        {
          protocol: 'http',
          hostname: '147.79.117.125',
          port: '4001',
        },
        {
          protocol: 'http',
          hostname: 'localhost',
          port: '4001',
        },
      ],
    },
  }),
);
