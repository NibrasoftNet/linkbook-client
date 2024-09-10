import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React from 'react';

import { getSession } from '@/actions/auth.actions';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { CircleIcon, CurvedArrowLeftIcon } from '@/icons/general';
import { frederickaTheGreat, imagesUrls } from '@/lib/constants';

async function CommunityCard({
  title,
  description,
  slug,
  imageSrc,
}: {
  title: string;
  description: string;
  slug: string;
  imageSrc: string;
}) {
  const session = await getSession();
  return (
    <CarouselItem className="relative h-fit basis-1/2 rounded-[30px] border border-primary md:basis-1/3">
      <div className="flex w-full -translate-x-2 -translate-y-2 flex-col items-center rounded-[30px] border-[3px] border-primary bg-white p-2">
        <Image
          src={imageSrc}
          alt="HowItWorks"
          width={500}
          height={500}
          className="w-full rounded-[30px] object-cover"
        />
        <div className="mt-2 flex w-full flex-col items-start gap-2 px-2 text-primary">
          <span className="rounded-full bg-tertiary/50 px-3 capitalize text-white">
            #{slug}
          </span>
          <h1 className="text-lg font-semibold">{title}</h1>
          <p className="text-left">{description}</p>
          <div className="flex w-full justify-end">
            <Link
              href={
                session?.user
                  ? `/${session.user.id}/community/${slug}`
                  : `/sign-in`
              }
              aria-label="click"
              className="group relative flex size-[70px] cursor-pointer items-center justify-center rounded-full bg-primary/30 hover:bg-primary/80"
            >
              <CircleIcon iconClass="size-[90%] absolute m-1 text-primary group-hover:text-white" />
              <CurvedArrowLeftIcon iconClass="size-8 text-primary relative group-hover:text-white" />
            </Link>
          </div>
        </div>
      </div>
    </CarouselItem>
  );
}
const CommunityOffers = () => {
  const t = useTranslations('Landing');
  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
      className="flex w-full flex-col items-center"
    >
      <div className="flex size-full max-w-[1400px] flex-col items-center gap-4 text-center">
        <div className="flex flex-col justify-center gap-2 text-center">
          <h3 className="text-xl capitalize text-black">{t('here_you_win')}</h3>
          <h1
            className={`${frederickaTheGreat.className} pb-6 text-6xl capitalize text-primary`}
          >
            {t('community_offers')}
          </h1>
        </div>
        <CarouselContent className="w-full gap-2 p-4">
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
        </CarouselContent>
        <div className="mt-4 flex w-full justify-center gap-4">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </div>
    </Carousel>
  );
};

export default CommunityOffers;
