'use client';

import Link from 'next/link';
import { useTranslations } from 'use-intl';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Success() {
  const t = useTranslations('SuccessPage');
  return (
    <Card className="flex h-screen w-full flex-col items-center justify-center text-center">
      <CardHeader>
        <CardTitle className="text-4xl">{t('success_header')}</CardTitle>
        <CardDescription className="text-4xl">
          {t('success_msg')}
        </CardDescription>
      </CardHeader>
      <CardContent />
      <CardFooter>
        <Link
          href="/sign-in"
          className="flex items-center justify-center gap-2 rounded-xl border bg-amber-500 px-4 py-2 text-white hover:bg-amber-700"
        >
          <span>{t('home_link')}</span>
        </Link>
      </CardFooter>
    </Card>
  );
}
