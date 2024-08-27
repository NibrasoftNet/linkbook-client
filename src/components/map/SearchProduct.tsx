'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Check, ChevronsUpDown } from 'lucide-react';
import React, { Suspense, useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2';
import { PiPaintBrushBroadDuotone } from 'react-icons/pi';
import * as z from 'zod';

import TableSkeleton from '@/components/skeleton/TableSkeleton';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CircleIcon } from '@/icons/general';
import { cn } from '@/lib/utils';
import { useGetAllCitiesQuery } from '@/tanstack/address.query';
import { useGetAllCategoriesQuery } from '@/tanstack/category.query';
import { SearchTypeEnum } from '@/types/types';
import useSearchStore from '@/zustand/searchStore';

import SearchIcon from '../../icons/general/Search.icon';

const searchFormSchema = z.object({
  type: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters.',
    })
    .max(30, {
      message: 'Name must not be longer than 30 characters.',
    }),
  city: z.string({
    message: 'Please select a city.',
  }),
  category: z
    .number({
      message: 'Please select a category.',
    })
    .optional()
    .nullable(),
});

type SearchFormValues = z.infer<typeof searchFormSchema>;

const SearchProduct = ({ page }: { page: string }) => {
  const { setCity, setCategory, setType } = useSearchStore();
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const cities = useGetAllCitiesQuery();
  const categories = useGetAllCategoriesQuery();
  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      type: SearchTypeEnum.DONATIONS,
    },
  });

  const handleSearchSubmit = (data: SearchFormValues) => {
    console.log('gsetgertgse', data);
    /*    if (page === 'home') {
      auth.session?.id
        ? router.push(`/${auth.session.id}/search`)
        : router.push('/search-unsubscribed');
    } */
    setType(data.type);
    setCity(data.city);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    data.category && setCategory(data.category);
  };

  return (
    <Suspense fallback={<TableSkeleton />}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSearchSubmit)}>
          <section
            style={{
              position: 'absolute',
              top: page === 'home' ? '50vh' : '10px',
              zIndex: '1000',
            }}
            className={`flex w-[90%] justify-center gap-2 md:right-1/4 ${page === 'home' ? 'md:w-1/2' : 'md:w-2/3'}`}
          >
            <div className="flex w-full flex-col gap-4">
              <div className="grid w-full grid-cols-1 flex-col items-center justify-center gap-2 rounded-md border-2 border-primary bg-white p-2 shadow-md shadow-gray-400 dark:bg-zinc-800 md:grid-cols-5 md:flex-row md:rounded-full">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="col-span-1 md:col-span-2">
                      <FormControl>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger className="w-full rounded-full">
                            <SelectValue placeholder="Select a type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Type</SelectLabel>
                              <SelectItem
                                value={SearchTypeEnum.DONATIONS}
                                className="lowercase"
                              >
                                {SearchTypeEnum.DONATIONS}
                              </SelectItem>
                              <SelectItem
                                value={SearchTypeEnum.SWAPS}
                                className="lowercase"
                              >
                                {SearchTypeEnum.SWAPS}
                              </SelectItem>
                              <SelectItem
                                value={SearchTypeEnum.PURCHASES}
                                className="lowercase"
                              >
                                {SearchTypeEnum.PURCHASES}
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="col-span-1 md:col-span-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                'w-full justify-between rounded-full',
                                !field.value && 'text-muted-foreground',
                              )}
                            >
                              {field.value
                                ? cities.data.result.find(
                                    (city: any) => city.value === field.value,
                                  )?.label
                                : 'Select a category'}
                              <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Search city..." />
                            <CommandList>
                              <CommandEmpty>No city found.</CommandEmpty>
                              <CommandGroup>
                                {cities.data.result.map((city: any) => (
                                  <CommandItem
                                    value={city.label}
                                    key={city.value}
                                    onSelect={() => {
                                      form.setValue('city', city.value);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        'mr-2 h-4 w-4',
                                        city.value === field.value
                                          ? 'opacity-100'
                                          : 'opacity-0',
                                      )}
                                    />
                                    {city.label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />
                <div className="col-span-1 flex items-center justify-center gap-2">
                  <button
                    type="submit"
                    aria-label="search-btn"
                    className="col-span-1 flex size-10 items-center justify-center rounded-full bg-tertiary text-white hover:bg-tertiary-foreground"
                  >
                    <div className="absolute flex size-10 items-center justify-center p-1">
                      <SearchIcon iconClass="size-10 hover:text-white" />
                    </div>
                    <CircleIcon iconClass="relative size-10" />
                  </button>
                  <button
                    type="submit"
                    aria-label="search-btn"
                    className="flex size-10 items-center justify-center rounded-full hover:bg-slate-500 hover:text-white dark:text-black"
                  >
                    <div className="absolute flex size-10 items-center justify-center p-1">
                      <PiPaintBrushBroadDuotone className="size-6" />
                    </div>
                    <CircleIcon iconClass="relative size-10" />
                  </button>
                </div>
              </div>
              {openFilter && (
                <div className="grid w-full grid-cols-1 flex-col items-center justify-center gap-2 rounded-md border-2 border-primary bg-white p-2 shadow-md shadow-gray-400 dark:bg-zinc-800 md:flex-row md:rounded-full">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem className="col-span-1 md:col-span-2">
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  'w-full justify-between rounded-full',
                                  !field.value && 'text-muted-foreground',
                                )}
                              >
                                {field.value
                                  ? categories.data.result.find(
                                      (cat: any) => cat.value === field.value,
                                    )?.label
                                  : 'Select a category'}
                                <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput placeholder="Search city..." />
                              <CommandList>
                                <CommandEmpty>No category found.</CommandEmpty>
                                <CommandGroup>
                                  {categories.data.result.map((cat: any) => (
                                    <CommandItem
                                      value={cat.label}
                                      key={cat.value}
                                      onSelect={() => {
                                        form.setValue('category', cat.value);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          'mr-2 h-4 w-4',
                                          cat.value === field.value
                                            ? 'opacity-100'
                                            : 'opacity-0',
                                        )}
                                      />
                                      {cat.label}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </div>
            <button
              type="button"
              aria-label="search-btn"
              onClick={() => setOpenFilter((prev) => !prev)}
              className="col-span-1 flex size-10 items-center justify-center rounded-full bg-primary text-white hover:bg-primary-foreground hover:text-primary"
            >
              <div className="absolute flex size-10 items-center justify-center p-1">
                <HiOutlineAdjustmentsHorizontal className="size-6" />
              </div>
              <CircleIcon iconClass="relative size-10" />
            </button>
          </section>
        </form>
      </Form>
    </Suspense>
  );
};

export default SearchProduct;
