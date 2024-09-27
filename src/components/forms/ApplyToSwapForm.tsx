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
import { useSwap } from '@/providers/SwapContext';
import { useGetAllCategoriesQuery } from '@/tanstack/category.query';
import { CrudOperationsEnum } from '@/types/types';
import type { ApplyToSwapSchemaFormType } from '@/validations/apply-to-swap-schema.validator';
import { applyToSwapSchema } from '@/validations/apply-to-swap-schema.validator';

const ApplyToSwapForm = ({
  operation,
  defaultValues,
  swapId,
}: {
  operation: CrudOperationsEnum;
  defaultValues: Partial<ApplyToSwapSchemaFormType>;
  swapId: number;
}) => {
  const t = useTranslations('SwapForm');
  const [files, setFiles] = useState<File[] | null>(null);
  const swap = useSwap();
  const categories = useGetAllCategoriesQuery();
  const form = useForm<ApplyToSwapSchemaFormType>({
    resolver: zodResolver(applyToSwapSchema),
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
  }, [files]);

  const onSubmit = async (swapData: Partial<ApplyToSwapSchemaFormType>) => {
    if (!files?.length) {
      toast.error('file', {
        description: `No attachement`,
      });
      return;
    }
    await swap.apply(swapId, swapData);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid size-full grid-cols-2 items-center gap-4 p-2"
      >
        <h1 className="text-2xl font-bold">Product Details</h1>
        <div className="col-span-2 grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="product.name"
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel>{t('product_name')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('product_name')}
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={() => {
              return (
                <FormItem className="w-full">
                  <FormLabel>{t('quantity')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('quantity')}
                      type="number"
                      {...form.register('quantity', {
                        valueAsNumber: true,
                      })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
        <FormField
          control={form.control}
          name="product.categoryId"
          render={({ field }) => (
            <FormItem className="col-span-2">
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
                        ? categories?.data?.result.find(
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
                      <CommandEmpty>No category found.</CommandEmpty>
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
              <FormItem className="col-span-2">
                <FormLabel>{t('product_description')}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
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
        {form.formState.errors && (
          <div className="text-sm text-destructive">
            {Object.values(form.formState.errors).map((error) => (
              <p key={error.message}>{error.message}</p>
            ))}
          </div>
        )}
        <Button
          type="submit"
          className="grid-cols-2 gap-2 md:grid-cols-1"
          disabled={swap.isLoading}
        >
          <LiaHourglassEndSolid className="size-6" />
          <span>{t('submit')}</span>
        </Button>
      </form>
    </Form>
  );
};

export default ApplyToSwapForm;
