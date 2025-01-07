'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Check, ChevronsUpDown, Paperclip } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import type { DropzoneOptions } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { LiaHourglassEndSolid } from 'react-icons/lia';
import { toast } from 'sonner';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useTranslations } from 'use-intl';

import FileSvgDraw from '@/components/forms/FileSvgDrow';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from '@/components/ui/extensions/FileUpload';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useAuth } from '@/providers/AuthContext';
import { useSwap } from '@/providers/SwapContext';
import { useGetAllCategoriesQuery } from '@/tanstack/category.query';
import { CrudOperationsEnum } from '@/types/types';
import type { SwapSchemaFormType } from '@/validations/create-swap-schema.validator';
import { createSwapSchema } from '@/validations/create-swap-schema.validator';

const SwapForm = ({
  operation,
  defaultValues,
  swapId,
}: {
  operation: CrudOperationsEnum;
  defaultValues: Partial<SwapSchemaFormType>;
  swapId?: number;
}) => {
  const t = useTranslations('SwapForm');
  const [files, setFiles] = useState<File[] | null>(null);
  const auth = useAuth();
  const swap = useSwap();
  const categories = useGetAllCategoriesQuery();
  const form = useForm<SwapSchemaFormType>({
    resolver: zodResolver(createSwapSchema),
    defaultValues,
    mode: 'onSubmit',
  });
  const dropZoneConfig = {
    multiple: true,
    maxFiles: 3,
    maxSize: 4 * 1024 * 1024,
  } satisfies DropzoneOptions;

  useEffect(() => {
    form.setValue('files', files);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    auth.session && form.setValue('address', auth.session.address);
  }, [files]);

  const onSubmit = async (swapData: Partial<SwapSchemaFormType>) => {
    if (operation === CrudOperationsEnum.CREATE && !files?.length) {
      toast.error('file', {
        description: `No attachement`,
      });
      return;
    }
    if (operation === CrudOperationsEnum.CREATE) {
      await swap.create(swapData);
      return;
    }
    if (operation === CrudOperationsEnum.UPDATE && swapId) {
      await swap.update(swapId, swapData);
      return;
    }

    toast.error('Wrong Operation', {
      description: `No ID provided for update`,
    });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto mb-5 w-[340px] items-center gap-3 rounded-[63px] border border-[#2777DF] px-5 py-4 shadow-[0px_3px_10px_rgba(39,119,223,0.188235)] md:w-[430px] md:px-10 md:py-5 lg:w-[500px] xl:w-[600px]"
      >
        <h1 className="mb-5 font-inter text-base !font-normal opacity-100 md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
          {t('product_details')}
        </h1>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="product.name"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col items-baseline justify-center gap-3 md:flex-row md:gap-0">
                  <FormLabel className="w-full font-inter text-sm !font-normal text-[#2777DF] md:w-1/3 md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                    {t('product_name')}
                  </FormLabel>
                  <div className="flex w-full flex-col gap-2 md:w-2/3">
                    <FormControl>
                      <Input
                        className="!mt-0 h-8 w-full rounded-[63px] border border-[#2777DF]/45 font-inter !font-normal"
                        placeholder={t('product_name')}
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={() => {
              return (
                <FormItem className="flex flex-col items-baseline justify-center gap-3 md:flex-row md:gap-0">
                  <FormLabel className="w-full font-inter text-sm !font-normal text-[#2777DF] md:w-1/3 md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                    {t('quantity')}
                  </FormLabel>
                  <div className="flex w-full flex-col gap-2 md:w-2/3">
                    <FormControl>
                      <Input
                        className="!mt-0 h-8 w-full rounded-[63px] border border-[#2777DF]/45 font-inter !font-normal"
                        placeholder={t('quantity')}
                        type="number"
                        {...form.register('quantity', {
                          valueAsNumber: true,
                        })}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="product.categoryId"
            render={({ field }) => (
              <FormItem className="flex flex-col items-baseline justify-center gap-3 md:flex-row md:gap-0">
                <FormLabel className="w-full font-inter text-sm !font-normal text-[#2777DF] md:w-1/3 md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                  {t('category')}
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          'justify-between px-3 w-full md:w-2/3 !mt-0 border h-8 border-[#2777DF]/45 font-inter !font-normal rounded-[63px]',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value
                          ? categories.data.result.find(
                              (cat: any) => cat.value === field.value,
                            )?.label
                          : `${t('category')}`}
                        <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder={t('category')} />
                      <CommandList>
                        <CommandEmpty>{t('no_category')}</CommandEmpty>
                        <CommandGroup>
                          {categories?.data?.result.map((cat: any) => (
                            <CommandItem
                              value={cat.label}
                              key={cat.value}
                              onSelect={() => {
                                form.setValue('product.categoryId', cat.value);
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
          <FormField
            control={form.control}
            name="product.description"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col items-baseline justify-center gap-3 md:flex-row md:gap-0">
                  <FormLabel className="w-full font-inter text-sm !font-normal text-[#2777DF] md:w-1/3 md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                    {t('product_description')}
                  </FormLabel>
                  <div className="flex w-full flex-col gap-2 md:w-2/3">
                    <FormControl>
                      <Textarea
                        rows={1}
                        placeholder={t('description_placeholder')}
                        className="!mt-0 min-h-8 w-full resize-y overflow-hidden rounded-[63px] border border-[#2777DF]/45 font-inter !font-normal"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              );
            }}
          />
          <div
            className={`col-span-2 flex w-full items-center justify-center rounded-md ${
              form.watch('files') !== null ? 'pt-4' : 'pt-2'
            }`}
          >
            <FormField
              control={form.control}
              name="files"
              render={() => (
                <FormItem className="flex w-full flex-col rounded-lg bg-background p-2">
                  <FileUploader
                    value={files}
                    onValueChange={setFiles}
                    dropzoneOptions={dropZoneConfig}
                  >
                    <FileInput
                      className={`border-2 border-dashed ${operation === CrudOperationsEnum.UPDATE && 'hidden'}`}
                    >
                      <div className="flex w-full flex-col items-center justify-center pb-4 pt-3 ">
                        <FileSvgDraw />
                      </div>
                    </FileInput>
                    <FileUploaderContent className="grid w-full grid-cols-1 md:grid-cols-2">
                      {files &&
                        files.length > 0 &&
                        files.map((file, i) => (
                          <FileUploaderItem
                            /* eslint-disable-next-line react/no-array-index-key */
                            key={i}
                            index={i}
                            className="border border-primary py-2"
                          >
                            <Paperclip className="size-4 stroke-current" />
                            <span>{file.name}</span>
                          </FileUploaderItem>
                        ))}
                    </FileUploaderContent>
                  </FileUploader>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* {form.formState.errors && (
            <div className="text-sm text-destructive">
              {Object.values(form.formState.errors).map((error) => (
                <p key={error.message}>{error.message}</p>
              ))}
            </div>
          )} */}
        </div>
        <div className="flex w-full justify-center">
          <Button
            type="submit"
            className="grid-cols-2 gap-2 md:grid-cols-1"
            disabled={swap.isLoading}
          >
            <LiaHourglassEndSolid className="size-6" />
            <span>{t('submit')}</span>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SwapForm;
