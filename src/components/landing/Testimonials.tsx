import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React from 'react';

import Marquee from '@/components/magicui/marquee';
import * as icons from '@/icons/general';
import { frederickaTheGreat } from '@/lib/constants';

export function getRandomIcon(props: IconProps): React.JSX.Element {
  const iconKeys = Object.keys(icons);
  const randomIndex = Math.floor(Math.random() * iconKeys.length);
  const randomKey = iconKeys[randomIndex] as keyof typeof icons;
  const SelectedIcon = icons[randomKey];
  return <SelectedIcon {...props} />;
}

const TestimonialCard = () => {
  const randomIcon = getRandomIcon({
    iconClass: 'size-20 text-tertiary',
  });
  return (
    <div className="z-10 flex size-[300px] flex-col gap-2 rounded-[50px] border-2 border-primary bg-white p-4">
      {randomIcon}
      <p className="text-left font-semibold text-black">
        find your wy to achieve your goals as long as you still breathing, ind
        your wy to achieve your goals as long as you still breathing
      </p>
    </div>
  );
};

const Testimonials = () => {
  const t = useTranslations('Landing');
  return (
    <section className="landing-section relative w-screen bg-blue-100 p-4">
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
        <Marquee pauseOnHover className="gap-4 [--duration:20s]">
          <TestimonialCard />
          <TestimonialCard />
          <TestimonialCard />
          <TestimonialCard />
        </Marquee>
      </div>
    </section>
  );
};

export default Testimonials;
