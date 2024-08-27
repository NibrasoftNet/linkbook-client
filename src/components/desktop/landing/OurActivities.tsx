import { Fredericka_the_Great } from 'next/font/google';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React from 'react';

import {
  AcademyHelmetIcon,
  CartIcon,
  CircleIcon,
  CurvedArrowIcon,
  CurvedArrowLeftIcon,
  StickIcon,
} from '@/icons/general';

const frederickaTheGreat = Fredericka_the_Great({
  subsets: ['latin'],
  weight: '400',
  style: 'normal',
});

const OurActivities = () => {
  const t = useTranslations('Landing');
  return (
    <section className="landing-section relative bg-blue-100 p-4">
      <Image
        src="/assets/images/landing/our_services.png"
        alt="our_service"
        fill
        className="absolute size-full"
      />
      <div className="flex size-full max-w-[1400px] flex-col items-center gap-4 text-center">
        <h1
          className={`${frederickaTheGreat.className} mb-16 pb-6 text-6xl text-primary`}
        >
          {t('our_activities')}
        </h1>
        <div className="flex w-full justify-around">
          <div className="h-[220px] w-[400px] rounded-[50px] border-2 border-tertiary bg-white">
            <div className="relative flex h-[220px] w-[400px] -translate-x-3 -translate-y-3 flex-col items-center gap-2 rounded-[50px] border-4 border-tertiary bg-white">
              <div className="absolute -top-16 flex items-center justify-center rounded-full p-2">
                <div className="absolute flex size-[130px] items-center justify-center rounded-full bg-tertiary p-2">
                  <CartIcon iconClass="size-20 text-white" />
                </div>
                <CircleIcon iconClass="relative size-[120px] text-white" />
              </div>
              <div className="relative flex size-full flex-col items-center justify-center gap-2 pt-6">
                <h2 className="text-4xl font-bold capitalize">shopping</h2>
                <h4 className="text-xl capitalize">interest group of</h4>
              </div>
            </div>
          </div>
          <div className="h-[220px] w-[400px] rounded-[50px] border-2 border-primary bg-white">
            <div className="relative flex h-[220px] w-[400px] -translate-x-3 -translate-y-3 flex-col items-center gap-2 rounded-[50px] border-4 border-primary bg-white">
              <div className="absolute -top-16 flex items-center justify-center rounded-full p-2">
                <div className="absolute flex size-[130px] items-center justify-center rounded-full bg-primary p-2">
                  <AcademyHelmetIcon iconClass="size-20 text-white" />
                </div>
                <CircleIcon iconClass="relative size-[120px] text-white" />
              </div>
              <div className="relative flex size-full flex-col items-center justify-center gap-2 pt-6">
                <h2 className="text-4xl font-bold capitalize">
                  education/training
                </h2>
                <h4 className="text-xl capitalize">interest group of</h4>
              </div>
            </div>
          </div>
          <div className="h-[220px] w-[400px] rounded-[50px] border-2 border-tertiary bg-white">
            <div className="relative flex h-[220px] w-[400px] -translate-x-3 -translate-y-3 flex-col items-center gap-2 rounded-[50px] border-4 border-tertiary bg-white">
              <div className="absolute -top-16 flex items-center justify-center rounded-full p-2">
                <div className="absolute flex size-[130px] items-center justify-center rounded-full bg-tertiary p-2">
                  <StickIcon iconClass="size-20 text-white" />
                </div>
                <CircleIcon iconClass="relative size-[120px] text-white" />
              </div>
              <div className="relative flex size-full flex-col items-center justify-center gap-2 pt-6">
                <h2 className="text-4xl font-bold capitalize">entertainment</h2>
                <h4 className="text-xl capitalize">interest group of</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-center gap-4">
          <button
            type="button"
            aria-label="shift"
            className="group relative flex size-[70px] cursor-pointer items-center justify-center rounded-full bg-primary/30 hover:bg-primary/80"
          >
            <CircleIcon iconClass="size-[90%] absolute m-1 text-primary group-hover:text-white" />
            <CurvedArrowIcon iconClass="size-8 text-primary relative group-hover:text-white" />
          </button>
          <button
            type="button"
            aria-label="shift"
            className="group relative flex size-[70px] cursor-pointer items-center justify-center rounded-full bg-tertiary/30 hover:bg-tertiary/80"
          >
            <CircleIcon iconClass="size-[90%] absolute m-1 text-tertiary group-hover:text-white" />
            <CurvedArrowLeftIcon iconClass="size-8 text-tertiary relative group-hover:text-white" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default OurActivities;
