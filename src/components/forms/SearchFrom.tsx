'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2';
import { PiPaintBrushBroadDuotone } from 'react-icons/pi';

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
import { useAuth } from '@/providers/AuthContext';
import type { CategoryTypeValue, CityTypeValue } from '@/types/category.type';
import { SearchTypeEnum, SubscriptionStatusEnum } from '@/types/types';
import type { SearchFormValues } from '@/validations/search-schema.validation';
import { searchFormSchema } from '@/validations/search-schema.validation';
import useSearchStore from '@/zustand/searchStore';

import SearchIcon from '../../icons/general/Search.icon';

const SearchFrom = ({
  page,
  allCategories,
  allCities,
}: {
  page: string;
  allCategories: CategoryTypeValue[];
  allCities: CityTypeValue[];
}) => {
  const translationSearchForm = useTranslations('SearchForm');
  const searchTranslate = useTranslations('SearchForm');
  const router = useRouter();
  const auth = useAuth();
  const { category, setCity, setCategory, setType } = useSearchStore();
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      type: SearchTypeEnum.DONATIONS,
      category,
      subscriptionStatus: SubscriptionStatusEnum.UNSUBSCRIBED,
    },
  });

  const handleSearchSubmit = (data: SearchFormValues) => {
    if (page === 'home') {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      auth.session?.id
        ? router.push(`/${auth.session.id}/search`)
        : router.push('/search-unsubscribed');
    }
    setType(data.type);
    setCategory(data.category);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    data.city && setCity(data.city);
  };

  const handleClearSearchParams = () => {
    setCategory(0);
    setCity('');
  };
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSearchSubmit)}
          className="flex items-center justify-center gap-4"
        >
          <div className="flex w-full flex-col">
            <div className="grid w-full grid-cols-1 flex-col items-center justify-center gap-2 rounded-md border-2 border-primary bg-white p-2 shadow-md shadow-gray-400 dark:bg-zinc-800 md:grid-cols-5 md:flex-row md:rounded-full">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="col-span-1 md:col-span-2">
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className="w-full rounded-full">
                          <SelectValue
                            placeholder={translationSearchForm('typeSelect')}
                          />
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
                              ? allCategories.find(
                                  (cat: any) => cat.value === field.value,
                                )?.label
                              : translationSearchForm('categorySelect')}
                            <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput
                            placeholder={`${searchTranslate('searchCity')}...`}
                          />
                          <CommandList>
                            <CommandEmpty>No category found.</CommandEmpty>
                            <CommandGroup>
                              {allCategories.map((cat: any) => (
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
                  type="button"
                  aria-label="clear-btn"
                  onClick={handleClearSearchParams}
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
                                ? allCities.find(
                                    (city: any) => city.value === field.value,
                                  )?.label
                                : 'Select an address'}
                              <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput
                              placeholder={`${searchTranslate('searchCity')}...`}
                            />
                            <CommandList>
                              <CommandEmpty>No city found.</CommandEmpty>
                              <CommandGroup>
                                {allCities.map((city: any) => (
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
              </div>
            )}
          </div>
          <button
            type="button"
            aria-label="filter-btn"
            onClick={() => setOpenFilter((prev) => !prev)}
            className="flex size-10 items-center justify-center rounded-full bg-primary text-white hover:bg-primary-foreground hover:text-primary"
          >
            <div className="absolute flex size-10 items-center justify-center p-1">
              <HiOutlineAdjustmentsHorizontal className="size-6" />
            </div>
            <CircleIcon iconClass="relative size-10" />
          </button>
        </form>
      </Form>
    </div>
  );
};

export default SearchFrom;
