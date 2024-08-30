'use client';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { BiDonateBlood } from 'react-icons/bi';
import { HiOutlineViewfinderCircle } from 'react-icons/hi2';
import { IoMdStopwatch } from 'react-icons/io';
import { TbCircleDotFilled } from 'react-icons/tb';

import AlertDialogCustom from '@/components/alert-dialog/AlertDialogCustom';
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { imagesUrls } from '@/lib/constants';
import type { DonationProps } from '@/types/donation.type';
import { DonationOperationEnum } from '@/types/donation.type';

dayjs.extend(relativeTime);
const DonationCard = ({ donation }: { donation: DonationProps }) => {
  return (
    <Card className="w-[550px] rounded-xl border p-4">
      <CardHeader className="flex w-full flex-row justify-between">
        <div className="flex w-fit items-center">
          <Image
            src={imagesUrls.logoImage}
            alt="Image"
            width="50"
            height="50"
            className="size-16 rounded-md border object-contain dark:brightness-[0.2] dark:grayscale"
          />
          <div className="ml-1.5 text-sm leading-tight">
            <span className="block font-bold">{donation.creator.email}</span>
            <span className="block font-normal">@visualizevalue</span>
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
        <p className="text-md my-3 block text-center leading-snug">
          {donation.description}
        </p>
        <div className="flex items-center rounded-xl border-2 border-primary">
          <Image
            src={donation.creator.photo ?? imagesUrls.logoImage}
            alt="Image"
            width="50"
            height="50"
            unoptimized
            className="size-full -translate-x-1 -translate-y-2 rounded-xl border border-primary bg-white object-contain p-2 shadow-lg shadow-primary dark:brightness-[0.2] dark:grayscale"
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
          <TbCircleDotFilled
            className={`size-6 ${!donation.active ? 'text-red-500' : 'text-green-400'} animate-ping `}
          />
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
              disabled={!donation.active}
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
