'use client';

import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { MdSwapHorizontalCircle } from 'react-icons/md';
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
import { useAuth } from '@/providers/AuthContext';
import { useGetSingleSwapQuery } from '@/tanstack/swaps.query';

const SwapDetails = ({ id }: { id: string }) => {
  const { data: result } = useGetSingleSwapQuery(id);
  const auth = useAuth();
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
        <CardDescription className="flex gap-2 text-center">
          <SiGooglemaps className="size-6" />
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
          <CarouselContent className="min-h-[150px]">
            {result.result.product.image.map((image: any) => (
              <CarouselItem key={image.id}>
                <div>
                  <Card>
                    <CardContent className="h-[450px] rounded-md border-2 border-primary">
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
        <Link href={`swaps/details/apply?id=${result.result.id}`}>
          <Button
            disabled={
              !result.result.active ||
              auth.session?.id === result.result.creator.id
            }
            className="flex items-center justify-center gap-2 rounded-full"
          >
            <MdSwapHorizontalCircle className="size-6" />
            <span>Ask for Swap</span>
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default SwapDetails;
