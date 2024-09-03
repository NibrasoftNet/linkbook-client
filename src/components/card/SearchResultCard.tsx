import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { GrMapLocation } from 'react-icons/gr';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CircleIcon, CurvedArrowLeftIcon } from '@/icons/general';
import { imagesUrls } from '@/lib/constants';
import type { SearchServiceProps } from '@/types/search.type';
import useSearchStore from '@/zustand/searchStore';

const SearchResultCard = ({ details }: { details: SearchServiceProps }) => {
  const { type } = useSearchStore();
  return (
    <Card className="size-full min-w-[250px] rounded-3xl border border-primary">
      <Card className="h-full -translate-x-2 -translate-y-0.5 rounded-3xl border-2 border-primary">
        <CardHeader className="flex w-full">
          <CardTitle className="truncate capitalize">
            {details.description}
          </CardTitle>
          <CardDescription className="flex gap-2">
            <GrMapLocation className="size-6" />
            <span className="truncate">{details.address.street}</span>
          </CardDescription>
          <span className="w-fit rounded-full border bg-tertiary px-2 text-sm lowercase text-white">
            #{type}
          </span>
        </CardHeader>
        <CardContent>
          <Image
            alt="Product image"
            className="max-h-[100px] w-full rounded-md object-contain"
            height="30"
            src={imagesUrls.logoImage}
            width="30"
            unoptimized
          />
        </CardContent>
        <CardFooter>
          <Link
            href={`donations?id=${details.id}`}
            className="flex w-full items-center justify-end gap-2"
          >
            <Button
              type="button"
              aria-label="shift"
              className="group relative flex size-[50px] cursor-pointer items-center justify-center rounded-full bg-primary/30 hover:bg-primary/80"
            >
              <CircleIcon iconClass="size-[90%] absolute m-1 text-primary group-hover:text-white" />
              <CurvedArrowLeftIcon iconClass="size-8 text-primary relative group-hover:text-white" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </Card>
  );
};

export default SearchResultCard;
