'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import type { ChangeEvent } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'use-intl';
import type * as z from 'zod';

import { MapSearchContainerDynamic } from '@/components/map/MapSearchContainerDynamic';
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/providers/AuthContext';
import { SubscriptionStatusEnum } from '@/types/types';
import type { User } from '@/types/users.type';
import type { UserUpdateProfileFormType } from '@/validations/user-update-profile-schema.validator';
import { userUpdateProfileFormSchema } from '@/validations/user-update-profile-schema.validator';
import useAddressStore from '@/zustand/addressStore';

const ProfileDetails = ({ session }: { session: User }) => {
  const t = useTranslations();
  const { address } = useAddressStore();
  const auth = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string>(auth?.session?.photo!);
  const [file, setFile] = useState<File | null>(null);
  const form = useForm<z.infer<typeof userUpdateProfileFormSchema>>({
    resolver: zodResolver(userUpdateProfileFormSchema),
    defaultValues: {
      firstName: session.firstName || '',
      lastName: session.lastName || '',
      phone: session.phone || '',
    },
  });
  console.log('qwerty', auth.session);
  useEffect(() => {
    form.setValue('address', address);
  }, [address]);

  useEffect(() => {
    form.setValue('photo', file);
  }, [file]);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const fileToUpload = e.target.files && e.target.files[0];
    if (fileToUpload) {
      const imageUrl = URL.createObjectURL(fileToUpload);
      setImage(imageUrl);
      setFile(fileToUpload);
    }
  };
  const handleSubmit = async (userData: Partial<UserUpdateProfileFormType>) => {
    await auth.update(auth?.session?.id!, userData);
  };
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>{t('ProfileDetails.profile_details')}</CardTitle>
        <CardDescription>
          {t('ProfileDetails.update_profile_details')}
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form
          id="user-update-profile-form"
          onSubmit={form.handleSubmit(handleSubmit)}
          className="grid gap-4"
        >
          <CardContent className="grid gap-6">
            <FormItem className="w-full">
              <FormLabel htmlFor="image">{t('Auth.meta_photo')}</FormLabel>
              <div className="flex items-center gap-4">
                <Avatar className="size-16 rounded-md border-2">
                  <AvatarImage src={image} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Button
                  variant="outline"
                  type="button"
                  onClick={handleButtonClick}
                >
                  {t('ProfileDetails.update_profile_image_change')}
                </Button>
                <Input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
              </div>
            </FormItem>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => {
                  return (
                    <FormItem className="w-full">
                      <FormLabel>{t('Auth.meta_firstname')}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t('Auth.meta_firstname')}
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
                name="lastName"
                render={({ field }) => {
                  return (
                    <FormItem className="w-full">
                      <FormLabel>{t('Auth.meta_lastname')}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t('Auth.meta_lastname')}
                          type="text"
                          {...field}
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
              name="phone"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>{t('Auth.meta_phone')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('Auth.meta_phone')}
                        type="phone"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormLabel className="flex w-full justify-center">
              Update your address
            </FormLabel>
            <div className="h-[400px] w-full overflow-hidden rounded-xl">
              <MapSearchContainerDynamic
                search
                searchMarkers={false}
                subscriptionStatus={SubscriptionStatusEnum.SUBSCRIBED}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button disabled={auth.isLoading}>
              {t('ProfileDetails.update_profile_save_change')}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default ProfileDetails;
