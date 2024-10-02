import dayjs from 'dayjs';
import Image from 'next/image';
import React from 'react';
import { BiDonateBlood } from 'react-icons/bi';
import { SiGooglemaps } from 'react-icons/si';

import AlertDialogCustom from '@/components/alert-dialog/AlertDialogCustom';
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Label } from '@/components/ui/label';
import { imagesUrls } from '@/lib/constants';
import { useAuth } from '@/providers/AuthContext';
import type { DonationProps } from '@/types/donation.type';
import { DonationOperationEnum } from '@/types/donation.type';
import type { ImagesProps } from '@/types/types';

const DonationDetailsCard = ({ donation }: { donation: DonationProps }) => {
  const auth = useAuth();
  return (
    <Card className="mx-auto w-full max-w-3xl gap-4">
      <CardHeader className="flex items-center">
        <Avatar className="h-14 min-w-14">
          <AvatarImage src={donation.creator.photo || imagesUrls.logoImage} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <CardTitle>{`${donation.creator.firstName} ${donation.creator.lastName}`}</CardTitle>
        <CardDescription>{`${donation.creator.email}`}</CardDescription>
        <CardDescription>
          {dayjs(donation.createdAt).format('DD-MMM-YYYY')}
        </CardDescription>
        <CardDescription className="flex items-center gap-2">
          <SiGooglemaps />
          <span>
            {donation.address.city}, {donation.address.country}
          </span>
        </CardDescription>
        <CardDescription>{donation.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex w-full flex-col items-center p-4">
        <Carousel
          opts={{
            align: 'start',
          }}
          className="mx-auto w-full max-w-xl justify-center"
        >
          <CarouselContent className="min-h-[150px]">
            {donation.product.image.map((image: ImagesProps) => (
              <CarouselItem key={image.id}>
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center rounded-md border-2 border-primary p-0">
                    <Image
                      src={image.path}
                      alt="landing-hero-image"
                      width={220}
                      height={150}
                      unoptimized
                      className="size-full object-cover"
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-10 flex w-full justify-center gap-4">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
        <div className="flex w-full flex-col gap-2">
          <div className="flex items-center gap-2">
            <Label>Name:</Label>
            <span className="flex w-full">{donation.product.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Label>Quantity:</Label>
            <span className="flex w-full">{donation.quantity}</span>
          </div>
          <div className="flex items-center gap-2">
            <Label>Description:</Label>
            <span className="flex w-full">{donation.product.description}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex w-full justify-center">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              disabled={
                !donation.active || auth.session?.id === donation.creator.id
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

export default DonationDetailsCard;
