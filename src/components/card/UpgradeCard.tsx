'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const UpgradeCard = () => {
  const t = useTranslations('Upgrade');
  return (
    <Card x-chunk="dashboard-02-chunk-0">
      <CardHeader className="p-2 pt-0 md:p-4">
        <CardTitle>{t('upgrade_pro')}</CardTitle>
        <CardDescription>{t('upgrade_description')}</CardDescription>
      </CardHeader>
      <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
        <Link href="/store/create">
          <Button size="sm" className="w-full">
            {t('upgrade_btn')}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default UpgradeCard;
