'use client';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { BiDonateBlood } from 'react-icons/bi';
import { HiOutlineViewfinderCircle } from 'react-icons/hi2';
import { IoMdStopwatch } from 'react-icons/io';

import AlertDialogCustom from '@/components/alert-dialog/AlertDialogCustom';
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog';
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
import type { DonationProps } from '@/types/donation.type';
import { DonationOperationEnum } from '@/types/donation.type';

dayjs.extend(relativeTime);
const DonationCard = ({ donation }: { donation: DonationProps }) => {
  const auth = useAuth();
  return (
    <Card className="w-auto min-[414px]:w-[400px] md:w-[500px] rounded-xl border p-4">
      <CardHeader className="flex w-full flex-row justify-between">
        <div className="flex w-fit items-center">
          <Avatar className="size-16 rounded-md border-2">
            <AvatarImage src={donation.creator.photo ?? imagesUrls.logoImage} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="ml-1.5 text-sm leading-tight">
            <span className="block font-bold">{donation.creator.lastName}</span>
            <span className="block font-normal">
              {donation.creator.firstName}
            </span>
          </div>
        </div>
        <Link href={`../donations?id=${donation.id}`}>
          <HiOutlineViewfinderCircle
            type="button"
            className="size-6 cursor-pointer"
          />
        </Link>
      </CardHeader>
      <CardContent>
        {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
        <p className="text-md my-3 block text-center leading-snug">
          {donation.description}
        </p>
        <div className="flex items-center rounded-xl border border-primary">
          <Image
            src={donation.product?.image[0]?.path ?? imagesUrls.logoImage}
            alt="Image"
            width="50"
            height="50"
            unoptimized
            className="size-full max-h-[300px] -translate-x-1 -translate-y-2 rounded-xl border-2 border-primary bg-white object-contain p-2 shadow-lg shadow-primary dark:brightness-[0.2] dark:grayscale"
          />
        </div>
        {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
        <div className="text-md mt-4 flex items-center gap-2 text-slate-600">
          <IoMdStopwatch />
          <span>Date: </span>
          <p className="my-0.5 py-1 text-base">
            {dayjs(donation.createdAt).fromNow()}
          </p>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="mt-3 flex flex-row items-center justify-between rounded-lg border border-primary p-4">
        <div className="mr-6 flex items-center gap-2 ">
          <span className="relative flex size-3">
            <span
              className={`absolute inline-flex size-full animate-ping rounded-full ${!donation.active ? 'bg-red-500' : 'bg-green-400'} opacity-75`}
            />
            <span
              className={`relative inline-flex size-3 rounded-full ${!donation.active ? 'bg-red-500' : 'bg-green-400'}`}
            />
          </span>
          <span className="ml-2">Active: </span>
          <span
            className={`capitalize ${!donation.active ? 'text-red-500' : 'text-green-400'}`}
          >
            {String(donation.active)}
          </span>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              disabled={
                !donation.active || donation.creator.id === auth.session?.id
              }
              className="flex items-center justify-center gap-2 rounded-full"
            >
              <BiDonateBlood />
              <span>Ask for donation</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogCustom
            title="Are you sure?"
            description="Are you sure you want to make your request."
            operation="Ask for donation"
            method={DonationOperationEnum.APPLY}
            param={donation.id}
          />
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export default DonationCard;
