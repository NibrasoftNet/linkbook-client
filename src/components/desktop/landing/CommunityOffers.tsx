import { Fredericka_the_Great } from 'next/font/google';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React from 'react';

import {
  CircleIcon,
  CurvedArrowIcon,
  CurvedArrowLeftIcon,
} from '@/icons/general';
import { imagesUrls } from '@/lib/constants';

const frederickaTheGreat = Fredericka_the_Great({
  subsets: ['latin'],
  weight: '400',
  style: 'normal',
});
const CommunityCard = ({
  title,
  description,
  slug,
  imageSrc,
}: {
  title: string;
  description: string;
  slug: string;
  imageSrc: string;
}) => {
  return (
    <div className="w-[350px] rounded-[30px] border border-primary">
      <div className="flex w-[350px] -translate-x-2 -translate-y-2 flex-col items-center rounded-[30px] border-[3px] border-primary bg-white p-2">
        <Image
          src={imageSrc}
          alt="HowItWorks"
          width={500}
          height={500}
          className="w-full rounded-[30px] object-cover"
        />
        <div className="flex w-full flex-col items-start gap-2 px-2">
          <span className="rounded-full bg-primary/50 px-3 capitalize text-white">
            {slug}
          </span>
          <h1 className="text-lg font-semibold">{title}</h1>
          <p className="text-left">{description}</p>
          <div className="flex w-full justify-end">
            <button
              type="button"
              aria-label="click"
              className="group relative flex size-[70px] cursor-pointer items-center justify-center rounded-full bg-primary/30 hover:bg-primary/80"
            >
              <CircleIcon iconClass="size-[90%] absolute m-1 text-primary group-hover:text-white" />
              <CurvedArrowLeftIcon iconClass="size-8 text-primary relative group-hover:text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
const CommunityOffers = () => {
  const t = useTranslations('Landing');
  return (
    <section className="landing-section p-4">
      <div className="flex size-full max-w-[1400px] flex-col items-center gap-10 text-center">
        <div className="flex flex-col justify-center gap-2 text-center">
          <h3 className="text-xl capitalize text-black">{t('here_you_win')}</h3>
          <h1
            className={`${frederickaTheGreat.className} pb-6 text-6xl capitalize text-primary`}
          >
            {t('community_offers')}
          </h1>
        </div>
        <div className="flex w-full items-center justify-around gap-4">
          <CommunityCard
            title="Book title 01"
            description="lorem ep sum take your chance or stay in the bed for the rest of
            your life"
            slug="span"
            imageSrc={imagesUrls.communityOfferImage01}
          />
          <CommunityCard
            title="Book title 02"
            description="lorem ep sum take your chance or stay in the bed for the rest of
            your life"
            slug="span"
            imageSrc={imagesUrls.communityOfferImage02}
          />
          <CommunityCard
            title="Book title 03"
            description="lorem ep sum take your chance or stay in the bed for the rest of
            your life"
            slug="span"
            imageSrc={imagesUrls.communityOfferImage01}
          />
          <CommunityCard
            title="Book title 04"
            description="lorem ep sum take your chance or stay in the bed for the rest of
            your life"
            slug="span"
            imageSrc={imagesUrls.communityOfferImage02}
          />
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

export default CommunityOffers;
