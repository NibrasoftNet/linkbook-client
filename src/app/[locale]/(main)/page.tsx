import '@/styles/landing.css';

import { getTranslations } from 'next-intl/server';
import * as React from 'react';

import Footer from '@/components/desktop/Footer';
import CommunityOffers from '@/components/desktop/landing/CommunityOffers';
import Hero from '@/components/desktop/landing/Hero';
import HowItWorks from '@/components/desktop/landing/HowItWorks';
import OurActivities from '@/components/desktop/landing/OurActivities';
import OurJob from '@/components/desktop/landing/OurJob';
import Testimonials from '@/components/desktop/landing/Testimonials';

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
    <main className="flex flex-col items-center">
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
