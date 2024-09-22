'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Paperclip } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import type { DropzoneOptions } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { LiaHourglassEndSolid } from 'react-icons/lia';
import { toast } from 'sonner';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useTranslations } from 'use-intl';

import FileSvgDraw from '@/components/forms/FileSvgDrow';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
import { useCommunity } from '@/providers/CommunityContext';
import { CrudOperationsEnum } from '@/types/types';
import type { CommunitySchemaFormType } from '@/validations/create-community-schema.validator';
import { createCommunitySchema } from '@/validations/create-community-schema.validator';

const CommunityForm = ({
  operation,
  defaultValues,
  communityId,
}: {
  operation: CrudOperationsEnum;
  defaultValues: Partial<CommunitySchemaFormType>;
  communityId?: number;
}) => {
  const t = useTranslations('CommunityForm');
  const [files, setFiles] = useState<File[] | null>(null);
  const community = useCommunity();
  const form = useForm<CommunitySchemaFormType>({
    resolver: zodResolver(createCommunitySchema),
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
  }, [files]);

  const onSubmit = async (communityData: Partial<CommunitySchemaFormType>) => {
    if (operation === CrudOperationsEnum.CREATE && !files?.length) {
      toast.error('file', {
        description: `No attachement`,
      });
      return;
    }
    if (operation === CrudOperationsEnum.CREATE) {
      await community.create(communityData);
      return;
    }
    if (operation === CrudOperationsEnum.UPDATE && communityId) {
      await community.update(communityId, communityData);
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
        className="grid size-full grid-cols-2 items-center gap-4 p-2"
      >
        <h1 className="text-2xl font-bold">{t('details')}</h1>
        <div className="col-span-2 grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel>{t('name')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('name')} type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel>{t('bio')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('bio')} type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
        <FormField
          control={form.control}
          name="isPrivate"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Do you prefer private community ?</FormLabel>
              </div>
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
          disabled={community.isLoading}
        >
          <LiaHourglassEndSolid className="size-6" />
          <span>Send</span>
        </Button>
      </form>
    </Form>
  );
};

export default CommunityForm;
