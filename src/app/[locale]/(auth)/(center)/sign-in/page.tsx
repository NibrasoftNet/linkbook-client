'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useTranslations } from 'use-intl';
import type * as z from 'zod';

import { AuthDrawer } from '@/components/auth/AuthDrawer';
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
import { userLoginSchema } from '@/validations/user-login-validation.schema';

export default function SignIn() {
  const auth = useAuth();
  const t = useTranslations('Auth');
  const form = useForm<z.infer<typeof userLoginSchema>>({
    resolver: zodResolver(userLoginSchema),
  });
  const handleSubmit = async (values: z.infer<typeof userLoginSchema>) => {
    await auth.login(values);
  };
  return (
    <>
      {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
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
        <div className="relative flex h-screen w-full items-center justify-center bg-primary/30 backdrop-blur-sm">
          <Card className="mx-auto max-w-sm">
            <CardHeader className="grid gap-2 text-center">
              <CardTitle className="text-3xl font-bold">
                {t('meta_sign_in_title')}
              </CardTitle>
              <CardDescription className="text-balance text-muted-foreground">
                {t('meta_sign_in_description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  id="user-login-form"
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="grid gap-4"
                >
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
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Link
                        href="/forget-password"
                        className="ml-auto inline-block text-sm underline"
                      >
                        {t('meta_forget_password')}
                      </Link>
                    </div>
                  </div>
                  <Button
                    disabled={auth.isLoading}
                    type="submit"
                    className="w-full"
                  >
                    {t('meta_sign_in_title')}
                  </Button>
                  <Button variant="outline" className="w-full">
                    {t('meta_sign_up_with_google')}
                  </Button>

                  <div className="mt-4 text-center text-sm">
                    <span>{t('meta_do_not_have_account')}</span>
                    <Link href="/sign-up" className="underline">
                      {t('meta_sign_up_title')}
                    </Link>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
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
