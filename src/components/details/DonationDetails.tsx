'use client';

import dayjs from 'dayjs';
import Image from 'next/image';
import React from 'react';
import { BiDonateBlood } from 'react-icons/bi';
import { SiGooglemaps } from 'react-icons/si';

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
import { useGetSingleDonationQuery } from '@/tanstack/donations.query';

const DonationDetails = ({ id }: { id: number }) => {
  const { data: result } = useGetSingleDonationQuery(id);
  console.log('ewq', id, result);
  return (
    <Card className="mx-auto w-full max-w-3xl gap-4">
      <CardHeader className="flex items-center">
        <Avatar className="h-14 min-w-14">
          <AvatarImage
            src={result.result.creator.photo || 'https://github.com/shadcn.png'}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <CardTitle>{`${result.result.creator.firstName} ${result.result.creator.lastName}`}</CardTitle>
        <CardDescription>{`${result.result.creator.firstName} ${result.result.creator.email}`}</CardDescription>
        <CardDescription>
          {dayjs(result.result.createdAt).format('DD-MMM-YYYY')}
        </CardDescription>
        <CardDescription className="flex items-center gap-2">
          <SiGooglemaps />
          <span>
            {result.result.address.city}, {result.result.address.country}
          </span>
        </CardDescription>
        <CardDescription>{result.result.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex w-full flex-col items-center p-4">
        <Carousel
          opts={{
            align: 'start',
          }}
          className="mx-auto w-full max-w-xl justify-center"
        >
          <CarouselContent>
            {result.result.product.image.map((image: any) => (
              <CarouselItem key={image.id}>
                <div>
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center rounded-md border border-primary bg-blue-50">
                      <Image
                        src={image.path}
                        alt="landing-hero-image"
                        width={220}
                        height={150}
                        unoptimized
                        className="size-full object-center"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="mt-8 flex w-full flex-col gap-2">
          <div className="flex items-center gap-2">
            <Label>Name:</Label>
            <span className="grid grid-cols-2 gap-4">
              {result.result.product.name}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Label>Quantity:</Label>
            <span className="grid grid-cols-2 gap-4">
              {result.result.quantity}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Label>Description:</Label>
            <span className="grid grid-cols-2 gap-4">
              {result.result.product.description}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex w-full justify-center">
        <Button
          disabled={!result.result.active}
          className="flex items-center justify-center gap-2 rounded-full"
        >
          <BiDonateBlood />
          <span>Ask for donation</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DonationDetails;
