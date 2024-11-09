'use client';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Image from 'next/image';
import React from 'react';
import { HiOutlineUserGroup } from 'react-icons/hi2';
import { IoMdStopwatch } from 'react-icons/io';

import AlertDialogCommunity from '@/components/alert-dialog/AlertDialogCommunity';
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
import type { CommunityValueType } from '@/types/community.type';
import { PrivateCommunityOperationEnum } from '@/types/community.type';

dayjs.extend(relativeTime);
const CommunityCard = ({ community }: { community: CommunityValueType }) => {
  const auth = useAuth();
  console.log('creator: ', community.creator);
  return (
    <Card className="w-[550px] rounded-xl border p-4">
      <CardHeader className="flex w-full flex-row justify-between">
        <div className="flex w-fit items-center">
          <Avatar className="size-16 rounded-md border-2">
            <AvatarImage
              src={community.creator.photo ?? imagesUrls.logoImage}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="ml-1.5 text-sm leading-tight">
            <span className="block font-bold">
              {community.creator.firstName}
            </span>
            <span className="block font-normal">
              {community.creator.lastName}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
        <p className="text-md my-3 block text-center leading-snug">
          {community.name}
        </p>
        <div className="flex items-center rounded-xl border border-primary">
          <Image
            src={community.image?.path ?? imagesUrls.logoImage}
            alt="Image-Community"
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
            {dayjs(community.createdAt).fromNow()}
          </p>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="mt-3 flex flex-row items-center justify-between rounded-lg border border-primary p-4">
        <span className="font-semibold capitalize">#{community.bio}</span>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              disabled={
                !community.isPrivate ||
                community.creator.id === auth.session?.id
              }
              className="flex items-center justify-center gap-2 rounded-full"
            >
              <HiOutlineUserGroup />
              <span>Join Community</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogCommunity
            title="Are you sure?"
            description="Are you sure you want to make your request."
            operation="Send Join Request"
            method={PrivateCommunityOperationEnum.APPLY}
            param={String(community.id)}
          />
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export default CommunityCard;
