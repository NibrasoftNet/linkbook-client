'use client';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { GiArmoredBoomerang } from 'react-icons/gi';
import { IoMdStopwatch } from 'react-icons/io';
import { MdOutlineMoreVert } from 'react-icons/md';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Separator } from '@/components/ui/separator';
import { imagesUrls } from '@/lib/constants';
import { useAuth } from '@/providers/AuthContext';
import type { CommunityFeedValueType } from '@/types/community-feed.type';
import type { ImagesProps } from '@/types/types';

dayjs.extend(relativeTime);
const CommunityFeedCard = ({ feed }: { feed: CommunityFeedValueType }) => {
  const auth = useAuth();
  return (
    <Card className="h-fit w-auto rounded-xl border min-[414px]:w-[400px] md:w-[500px]">
      <CardHeader className="flex w-full flex-row justify-between">
        <div className="flex w-fit items-center">
          <Avatar className="size-16 rounded-md border-2">
            <AvatarImage
              src={feed?.community.image?.path ?? imagesUrls.logoImage}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="ml-1.5 text-sm leading-tight">
            <span className="block font-bold">{feed.community.name}</span>
            <span className="block font-normal">#{feed.community.bio}</span>
          </div>
        </div>
        {feed.creator.id === auth.session?.id && (
          <Link href={`details/update?id=${feed.id}`}>
            <MdOutlineMoreVert
              type="button"
              className="size-6 cursor-pointer disabled:text-gray-500"
            />
          </Link>
        )}
      </CardHeader>
      <CardContent>
        <h4 className="block text-center text-lg font-semibold leading-snug">
          {feed.title}
        </h4>
        <p className="text-center">{feed.description}</p>
        <Carousel
          opts={{
            align: 'start',
          }}
          className="h-fit w-full max-w-xl justify-center"
        >
          <CarouselContent className="min-h-[150px] border-none">
            {feed.image.map((image: ImagesProps) => (
              <CarouselItem key={image.id}>
                <Card>
                  <CardContent className="flex h-[250px] w-full items-center justify-center p-0">
                    <Image
                      src={image.path}
                      alt="landing-hero-image"
                      width={350}
                      height={350}
                      unoptimized
                      className="size-full rounded-lg object-cover"
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-10 flex w-full justify-center">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
        {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
        <div className="text-md flex items-center gap-2 text-slate-600">
          <IoMdStopwatch />
          <span>Date: </span>
          <p className="my-0.5 py-1 text-base">
            {dayjs(feed.createdAt).fromNow()}
          </p>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="mt-3 flex flex-row items-center justify-between rounded-lg border border-primary p-4">
        <span className="font-semibold capitalize">
          # {feed.creator.firstName} {feed.creator.lastName}
        </span>
        <Link href={feed.url} target="_blank">
          <Button className="flex items-center justify-center gap-2 rounded-full">
            <GiArmoredBoomerang />
            <span>More</span>
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CommunityFeedCard;
