'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useTranslations } from 'use-intl';
import type * as z from 'zod';

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
import { useUpdateSecurityMutation } from '@/tanstack/auth.query';
import { userResetPasswordFormSchema } from '@/validations/user-reset-password-schema.validator';

const ProfileSecurity = () => {
  const t = useTranslations('SecurityDetails');
  const { mutateAsync: mutateUpdateSecurity, isLoading: isUpdateLoading } =
    useUpdateSecurityMutation();
  const form = useForm<z.infer<typeof userResetPasswordFormSchema>>({
    resolver: zodResolver(userResetPasswordFormSchema),
  });
  const handleSubmit = async (
    values: z.infer<typeof userResetPasswordFormSchema>,
  ) => {
    const toastId = toast('Start...');
    toast.loading('Loading...', {
      description: 'Profile Update...',
      id: toastId,
    });
    try {
      const { status: uploadStatus, message } =
        await mutateUpdateSecurity(values);
      if (!uploadStatus) {
        toast.error('Failed Update Profile', {
          description: Object.values(JSON.parse(message)).join(', '),
        });
        toast.dismiss(toastId);
        return;
      }
      toast.success('Success', {
        description: 'Successful Update Profile',
        id: toastId,
      });
    } catch (e) {
      toast.error('Error', {
        description: `${e}`,
      });
      toast.dismiss(toastId);
    }
    toast.dismiss(toastId);
  };
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>{t('security_details_title')}</CardTitle>
        <CardDescription>{t('security_details_description')}</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form
          id="user-update-profile-form"
          onSubmit={form.handleSubmit(handleSubmit)}
          className="grid gap-4"
        >
          <CardContent className="grid gap-6">
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>{t('current_password')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('current_password')}
                        type="password"
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
              name="newPassword"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>{t('new_password')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('new_password')}
                        type="password"
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
              name="confirmedPassword"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>{t('confirm_new_password')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('confirm_new_password')}
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isUpdateLoading}>
              {t('update_password')}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default ProfileSecurity;
