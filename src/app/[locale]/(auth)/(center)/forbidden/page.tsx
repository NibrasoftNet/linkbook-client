'use client';

import { HiOutlineLockOpen } from 'react-icons/hi2';
import { useTranslations } from 'use-intl';

export default function ForbiddenPage() {
  const t = useTranslations('Forbidden');
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <HiOutlineLockOpen className="mx-auto size-24 text-primary" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {t('title')}
        </h1>
        <p className="mt-4 text-muted-foreground">{t('description')}</p>
        <div className="mt-6" />
      </div>
    </div>
  );
}
