'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaCheckCircle } from 'react-icons/fa';
import { ImCancelCircle } from 'react-icons/im';
import { toast } from 'sonner';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useTranslations } from 'use-intl';
import type * as z from 'zod';

import { AuthDrawer } from '@/components/auth/AuthDrawer';
import { MapSearchContainerDynamic } from '@/components/map/MapSearchContainerDynamic';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
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
import { imagesUrls } from '@/lib/constants';
import { useAuth } from '@/providers/AuthContext';
import { OperationEnum } from '@/types/auth.type';
import { userRegisterFormSchema } from '@/validations/user-register-validation.schema';
import useAddressStore from '@/zustand/addressStore';

export default function SignUp() {
  const auth = useAuth();
  const t = useTranslations('Auth');
  const { address } = useAddressStore();
  const form = useForm<z.infer<typeof userRegisterFormSchema>>({
    resolver: zodResolver(userRegisterFormSchema),
  });

  useEffect(() => {
    form.setValue('address', address);
  }, [address]);

  const handleSubmit = async (
    values: z.infer<typeof userRegisterFormSchema>,
  ) => {
    if (form.getValues('address') === null) {
      toast.error('Failed', {
        description: 'address is required. Please select your address.',
      });
      return;
    }
    await auth.register(values);
  };
  return (
    <>
      <section className="relative h-screen w-full">
        <div className="absolute h-screen w-screen">
          <Image
            src={imagesUrls.heroImage}
            alt="Image"
            width="1280"
            height="840"
            unoptimized
            className="object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
        <div className="relative flex h-screen w-full flex-col items-center justify-center gap-10 bg-primary/30 backdrop-blur-sm md:flex-row">
          <Card className="w-full max-w-sm md:w-1/2 ">
            <CardHeader>
              <CardTitle className="text-xl">
                {t('meta_sign_up_title')}
              </CardTitle>
              <CardDescription>{t('meta_sign_up_description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  id="user-register-form"
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="grid gap-4"
                >
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => {
                        return (
                          <FormItem className="w-full">
                            <FormLabel>{t('meta_firstname')}</FormLabel>
                            <FormControl>
                              <Input
                                placeholder={t('meta_firstname')}
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
                            <FormLabel>{t('meta_lastname')}</FormLabel>
                            <FormControl>
                              <Input
                                placeholder={t('meta_lastname')}
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
                    name="email"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-full">
                          <FormLabel>{t('meta_email_address')}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={t('meta_email_address')}
                              type="email"
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
                    name="password"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-full">
                          <FormLabel>{t('meta_password')}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={t('meta_password')}
                              type="password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <FormLabel className="flex w-full gap-2">
                    <span className="text-sm">Address:</span>
                    <span className="flex text-sm font-normal">
                      {address?.street || 'Selectionner votre Address'}
                    </span>
                    <span>
                      {address?.street ? (
                        <FaCheckCircle className="size-6 text-green-500" />
                      ) : (
                        <ImCancelCircle className="size-6 text-red-500" />
                      )}
                    </span>
                  </FormLabel>
                  <Button
                    disabled={auth.isLoading}
                    type="submit"
                    className="w-full"
                  >
                    {t('meta_sign_up_title')}
                  </Button>
                  <Button variant="outline" className="w-full">
                    {t('meta_sign_up_with_google')}
                  </Button>
                </form>
              </Form>
              <div className="mt-4 text-center text-sm">
                {t('meta_already_have_account')}
                <Link href="/sign-in" className="underline">
                  {t('meta_sign_in_title')}
                </Link>
              </div>
            </CardContent>
          </Card>
          <div className="h-[550px] w-[800px] overflow-hidden rounded-xl">
            <MapSearchContainerDynamic />;
          </div>
        </div>
      </section>
      {auth?.openAuthDrawer && (
        <AuthDrawer
          openAuthDrawer={auth?.openAuthDrawer}
          setOpenAuthDrawer={auth?.setOpenAuthDrawer}
          operation={OperationEnum['confirm-account']}
          email={form.getValues('email')}
        />
      )}
    </>
  );
}
