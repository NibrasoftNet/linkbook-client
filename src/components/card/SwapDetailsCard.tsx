import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
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
import { imagesUrls } from '@/lib/constants';
import { useAuth } from '@/providers/AuthContext';
import type { SwapProps } from '@/types/swap.type';

const SwapDetailsCard = ({ swap }: { swap: SwapProps }) => {
  const auth = useAuth();
  return (
    <Card className="mx-auto w-full max-w-3xl gap-4">
      <CardHeader className="flex items-center">
        <Avatar className="h-14 min-w-14">
          <AvatarImage src={swap.creator.photo || imagesUrls.logoImage} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <CardTitle>{`${swap.creator.firstName} ${swap.creator.lastName}`}</CardTitle>
        <CardDescription>{`${swap.creator.email}`}</CardDescription>
        <CardDescription>
          {dayjs(swap.createdAt).format('DD-MMM-YYYY')}
        </CardDescription>
        <CardDescription className="flex items-center gap-2">
          <SiGooglemaps />
          <span>
            {swap.address.city}, {swap.address.country}
          </span>
        </CardDescription>
        <CardDescription>{swap.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex w-full flex-col items-center p-4">
        <Carousel
          opts={{
            align: 'start',
          }}
          className="mx-auto w-full max-w-xl justify-center"
        >
          <CarouselContent className="min-h-[150px]">
            {swap.product.image.map((image: any) => (
              <CarouselItem key={image.id}>
                <div>
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center rounded-md border-2 border-primary">
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
                </div>
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
            <span className="flex w-full">{swap.product.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Label>Quantity:</Label>
            <span className="flex w-full">{swap.quantity}</span>
          </div>
          <div className="flex items-start gap-2">
            <Label>Description:</Label>
            <span className="flex w-full">{swap.product.description}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex w-full justify-center">
        <Link href={`swaps/details/apply?id=${swap.id}`}>
          <Button
            disabled={!swap.active || auth.session?.id === swap.creator.id}
            className="flex items-center justify-center gap-2 rounded-full"
          >
            <BiDonateBlood />
            <span>Ask for swap</span>
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default SwapDetailsCard;
