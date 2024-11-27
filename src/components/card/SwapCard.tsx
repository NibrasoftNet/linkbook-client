'use client';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { HiOutlineViewfinderCircle } from 'react-icons/hi2';
import { IoMdStopwatch } from 'react-icons/io';
import { MdSwapHorizontalCircle } from 'react-icons/md';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { imagesUrls } from '@/lib/constants';
import { useAuth } from '@/providers/AuthContext';
import type { SwapProps } from '@/types/swap.type';

dayjs.extend(relativeTime);
const SwapCard = ({ swap }: { swap: SwapProps }) => {
  const auth = useAuth();
  return (
    <Card className="w-[550px] rounded-xl border p-4">
      <CardHeader className="flex w-full flex-row justify-between">
        <div className="flex w-fit items-center">
          <Avatar className="size-16 rounded-md border-2">
            <AvatarImage src={swap.creator.photo ?? imagesUrls.logoImage} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="ml-1.5 text-sm leading-tight">
            <span className="block font-bold">{swap.creator.lastName}</span>
            <span className="block font-normal">{swap.creator.firstName}</span>
          </div>
        </div>
        <Link href={`../swaps?id=${swap.id}`}>
          <HiOutlineViewfinderCircle
            type="button"
            className="size-6 cursor-pointer"
          />
        </Link>
      </CardHeader>
      <CardContent>
        {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
        <p className="text-md my-3 block text-center leading-snug">
          {swap.description}
        </p>
        <div className="flex items-center rounded-xl border border-primary">
          <Image
            src={swap.product?.image[0]?.path ?? imagesUrls.logoImage}
            alt="Image"
            width="50"
            height="50"
            unoptimized
            className="size-full max-h-[300px] -translate-x-1 -translate-y-2 rounded-xl border-2 border-primary bg-white object-cover p-2 shadow-lg shadow-primary dark:brightness-[0.2] dark:grayscale"
          />
        </div>
        {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
        <div className="text-md mt-4 flex items-center gap-2 text-slate-600">
          <IoMdStopwatch />
          <span>Date: </span>
          <p className="my-0.5 py-1 text-base">
            {dayjs(swap.createdAt).fromNow()}
          </p>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="mt-3 flex flex-row items-center justify-between rounded-lg border border-primary p-4">
        <div className="mr-6 flex items-center gap-2 ">
          <span className="relative flex size-3">
            <span
              className={`absolute inline-flex size-full animate-ping rounded-full ${!swap.active ? 'bg-red-500' : 'bg-green-400'} opacity-75`}
            />
            <span
              className={`relative inline-flex size-3 rounded-full ${!swap.active ? 'bg-red-500' : 'bg-green-400'}`}
            />
          </span>
          <span className="ml-2">Active: </span>
          <span
            className={`capitalize ${!swap.active ? 'text-red-500' : 'text-green-400'}`}
          >
            {String(swap.active)}
          </span>
        </div>
        <Link href={`details/apply?id=${swap.id}`}>
          <Button
            disabled={!swap.active || auth.session?.id === swap.creator.id}
            className="flex items-center justify-center gap-2 rounded-full"
          >
            <MdSwapHorizontalCircle className="size-6" />
            <span>Ask for swap</span>
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default SwapCard;
