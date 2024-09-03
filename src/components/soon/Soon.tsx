'use client';

import { useTranslations } from 'use-intl';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Soon() {
  const t = useTranslations('SoonPage');
  return (
    <Card className="flex size-full flex-col items-center justify-center text-center">
      <CardHeader>
        <CardTitle className="text-4xl">{t('title')}</CardTitle>
        <CardDescription className="text-4xl">
          {t('description')}
        </CardDescription>
      </CardHeader>
      <CardContent />
      <CardFooter>{t('later')}</CardFooter>
    </Card>
  );
}
