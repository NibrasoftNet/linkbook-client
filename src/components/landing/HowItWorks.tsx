import { Fredericka_the_Great } from 'next/font/google';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React from 'react';

import {
  BooksIcon,
  CurvedArrowIcon,
  CurvedArrowLeftIcon,
  SearchIcon,
} from '@/icons/general';
import { RocketIcon } from '@/icons/landing';
import { imagesUrls } from '@/lib/constants';

const frederickaTheGreat = Fredericka_the_Great({
  subsets: ['latin'],
  weight: '400',
  style: 'normal',
});
const HowItWorks = () => {
  const t = useTranslations('HowItWorks');
  return (
    <section className="landing-section p-4">
      <div className="flex size-full max-w-[1400px] flex-col items-center gap-10 text-center">
        <h1
          className={`${frederickaTheGreat.className} pb-6 text-6xl capitalize text-primary`}
        >
          {t('title')}
        </h1>
        <div className="flex w-full flex-col-reverse items-center md:flex-row">
          <div className="flex size-full items-center justify-center rounded-lg md:w-1/2">
            <Image
              src={imagesUrls.howItWorksImage}
              alt="HowItWorks"
              width={500}
              height={500}
            />
          </div>
          <div className="flex size-full flex-col justify-center md:w-1/2">
            <div className="flex items-center gap-6">
              <div className="size-[100px] rounded-[30px] border border-primary bg-white">
                <div className="flex size-[100px] translate-x-2 translate-y-2 cursor-pointer items-center justify-center rounded-[30px] border-[3px] border-primary bg-white transition duration-300 ease-in-out hover:translate-x-0 hover:translate-y-0">
                  <RocketIcon iconClass="size-[70px]" />
                </div>
              </div>
              <div className="flex size-full flex-col items-start justify-center">
                <h2
                  className={`${frederickaTheGreat.className} text-2xl text-primary`}
                >
                  {t('subscribe_title')}
                </h2>
                <p className="text-start">{t('subscribe')}</p>
              </div>
            </div>
            <div className="w-full pr-16">
              <CurvedArrowIcon iconClass="size-16 -rotate-90 text-tertiary" />
            </div>
            <div className="flex items-center gap-6">
              <div className="size-[100px] rounded-[30px] border border-tertiary bg-white">
                <div className="flex size-[100px] translate-x-2 translate-y-2 cursor-pointer items-center justify-center rounded-[30px] border-[3px] border-tertiary bg-white transition duration-300 ease-in-out hover:translate-x-0 hover:translate-y-0">
                  <SearchIcon iconClass="size-[70px] text-tertiary" />
                </div>
              </div>
              <div className="flex size-full flex-col items-start justify-center">
                <h2
                  className={`${frederickaTheGreat.className} text-2xl text-tertiary`}
                >
                  {t('search_title')}
                </h2>
                <p className="text-start">{t('search')}</p>
              </div>
            </div>
            <div className="w-full pl-16">
              <CurvedArrowLeftIcon iconClass="size-16 rotate-90 text-tertiary" />
            </div>
            <div className="flex items-center gap-6">
              <div className="size-[100px] rounded-[30px] border border-primary bg-white">
                <div className="flex size-[100px] translate-x-2 translate-y-2 cursor-pointer items-center justify-center rounded-[30px] border-[3px] border-primary bg-white transition duration-300 ease-in-out hover:translate-x-0 hover:translate-y-0">
                  <BooksIcon iconClass="size-[70px]" />
                </div>
              </div>
              <div className="flex size-full flex-col items-start justify-center">
                <h2
                  className={`${frederickaTheGreat.className} text-2xl text-primary`}
                >
                  {t('results_title')}
                </h2>
                <p className="text-start">{t('results')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
