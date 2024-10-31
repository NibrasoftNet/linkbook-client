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
import { useCommunityFeed } from '@/providers/CommunityFeedContext';
import { useGetAllCommunitiesQuery } from '@/tanstack/community.query';
import { CrudOperationsEnum } from '@/types/types';
import type { CommunityFeedSchemaFormType } from '@/validations/create-community-feed-schema.validator';
import { createCommunityFeedSchema } from '@/validations/create-community-feed-schema.validator';

const CommunityFeedForm = ({
  operation,
  defaultValues,
  communityFeedId,
}: {
  operation: CrudOperationsEnum;
  defaultValues: Partial<CommunityFeedSchemaFormType>;
  communityFeedId?: number;
}) => {
  const t = useTranslations('CommunityFeedForm');
  const searchTranslate = useTranslations('SearchForm');
  const [files, setFiles] = useState<File[] | null>(null);
  const communityFeed = useCommunityFeed();
  const form = useForm<CommunityFeedSchemaFormType>({
    resolver: zodResolver(createCommunityFeedSchema),
    defaultValues,
    mode: 'onSubmit',
  });
  const { data } = useGetAllCommunitiesQuery();
  const dropZoneConfig = {
    multiple: true,
    maxFiles: 3,
    maxSize: 4 * 1024 * 1024,
  } satisfies DropzoneOptions;

  useEffect(() => {
    form.setValue('files', files);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  }, [files]);

  const onSubmit = async (
    communityFeedData: Partial<CommunityFeedSchemaFormType>,
  ) => {
    if (operation === CrudOperationsEnum.CREATE && !files?.length) {
      toast.error('file', {
        description: `No attachement`,
      });
      return;
    }
    if (operation === CrudOperationsEnum.CREATE) {
      await communityFeed.create(communityFeedData);
      return;
    }
    if (operation === CrudOperationsEnum.UPDATE && communityFeedId) {
      await communityFeed.update(communityFeedId, communityFeedData);
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
        className="grid h-[calc(100vh-8rem)] grid-cols-2 items-center gap-4 p-2"
      >
        <h1 className="text-2xl font-bold">{t('details')}</h1>
        <div className="col-span-2 grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel>{t('title')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('title')} type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel>{t('url')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('url')} type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => {
            return (
              <FormItem className="col-span-2">
                <FormLabel>{t('description')}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t('description')}
                    className="resize-none"
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
          name="communityId"
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
                        ? data.result.find(
                            (cat: any) => cat.value === field.value,
                          )?.label
                        : 'Select a community'}
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
                        {data.result.map((cat: any) => (
                          <CommandItem
                            value={cat.label}
                            key={cat.value}
                            onSelect={() => {
                              form.setValue('communityId', cat.value);
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
          disabled={communityFeed.isLoading}
        >
          <LiaHourglassEndSolid className="size-6" />
          <span>Send</span>
        </Button>
      </form>
    </Form>
  );
};

export default CommunityFeedForm;
