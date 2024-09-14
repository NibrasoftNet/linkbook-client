'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React from 'react';

import { TestimonialCard } from '@/components/card/TestimonialCard';
import Marquee from '@/components/magicui/marquee';
import * as icons from '@/icons/general';
import { frederickaTheGreat } from '@/lib/constants';
import type { TestimonialsPropsType } from '@/types/testimonials.type';
import useSearchStore from '@/zustand/searchStore';

export function getRandomIcon(props: IconProps): React.JSX.Element {
  const iconKeys = Object.keys(icons);
  const randomIndex = Math.floor(Math.random() * iconKeys.length);
  const randomKey = iconKeys[randomIndex] as keyof typeof icons;
  const SelectedIcon = icons[randomKey];
  return <SelectedIcon {...props} />;
}

const Testimonials = () => {
  const t = useTranslations('Landing');
  const { allTestimonials } = useSearchStore();
  return (
    <section className="landing-section relative w-screen overflow-hidden bg-blue-100 p-4">
      <Image
        src="/assets/images/landing/our_services.png"
        alt="our_service"
        fill
        className="absolute size-full"
      />
      <div className="flex size-full max-w-[1400px] flex-col items-center gap-4 text-center">
        <h1
          className={`${frederickaTheGreat.className} mb-16 pb-6 text-6xl capitalize text-primary`}
        >
          {t('testimonials')}
        </h1>
        <Marquee pauseOnHover className="gap-8 [--duration:20s]">
          {allTestimonials.map((testimonial: TestimonialsPropsType) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default Testimonials;
