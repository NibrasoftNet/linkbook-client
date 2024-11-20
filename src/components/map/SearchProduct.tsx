'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import SearchFrom from '@/components/forms/SearchFrom';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { CircleIcon } from '@/icons/general';
import type { CategoryTypeValue } from '@/types/category.type';
import useSearchStore from '@/zustand/searchStore';

import SearchIcon from '../../icons/general/Search.icon';

const SearchProduct = ({ page }: { page: string }) => {
  const { allCategories, allCities } = useSearchStore();
  const categorytranslate = useTranslations('SearchForm');
  const allTranslatedCategories: CategoryTypeValue[] = [
    {
      label: categorytranslate('passionateReading'),
      value: 1,
    },
    { label: categorytranslate('univStudent'), value: 2 },
    {
      label: categorytranslate('highSchoolStudent'),
      value: 3,
    },
    {
      label: categorytranslate('PrimarySchoolStudent'),
      value: 4,
    },
  ];
  if (!allTranslatedCategories.length || !allCities.length) {
    return (
      <div className="flex size-full items-center justify-center">
        <h1 className="text-3xl font-bold">Service Temporary Unavailable</h1>
      </div>
    );
  }

  return (
    <>
      <section
        style={{
          position: 'absolute',
          top: page === 'home' ? '70vh' : '10px',
          zIndex: '500',
        }}
        className={`hidden justify-center gap-2 md:right-[20%] md:flex md:w-[90%] lg:right-[24%] ${page === 'home' ? 'md:w-1/2' : 'md:w-2/3'}`}
      >
        <SearchFrom
          page={page}
          allCategories={allTranslatedCategories}
          allCities={allCities}
        />
      </section>
      <section className="block md:hidden">
        <Drawer>
          <DrawerTrigger asChild>
            <button
              type="button"
              aria-label="open-search-btn"
              className="absolute top-2/3 flex size-16 animate-bounce items-center justify-center rounded-full bg-tertiary text-white hover:bg-tertiary-foreground"
            >
              <div className="absolute flex size-16 items-center justify-center p-1">
                <SearchIcon iconClass="size-16 hover:text-white" />
              </div>
              <CircleIcon iconClass="relative size-16" />
            </button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>Map Search</DrawerTitle>
                <DrawerDescription>
                  Search the service that you desire.
                </DrawerDescription>
              </DrawerHeader>
              <SearchFrom
                page={page}
                allCategories={allCategories}
                allCities={allCities}
              />
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </section>
    </>
  );
};

export default SearchProduct;
