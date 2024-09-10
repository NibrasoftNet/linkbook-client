import '@/styles/landing.css';

import { getTranslations } from 'next-intl/server';
import * as React from 'react';

import CommunityOffers from '@/components/landing/CommunityOffers';
import Footer from '@/components/landing/Footer';
import Hero from '@/components/landing/Hero';
import HowItWorks from '@/components/landing/HowItWorks';
import OurActivities from '@/components/landing/OurActivities';
import OurJob from '@/components/landing/OurJob';
import Testimonials from '@/components/landing/Testimonials';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Landing',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function Index() {
  return (
    <main className="flex w-screen flex-col items-center gap-10 text-clip">
      <Hero />
      <OurJob />
      <HowItWorks />
      <OurActivities />
      <CommunityOffers />
      <Testimonials />
      <Footer />
    </main>
  );
}
