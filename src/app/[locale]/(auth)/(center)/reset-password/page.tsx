'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'use-intl';
import type * as z from 'zod';

import { Button } from '@/components/ui/button';
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
import { resetForgotPasswordSchema } from '@/validations/user-reset-forgot-password-schema.validator';

export default function ResetPasswordPage() {
  const router = useRouter();
  const auth = useAuth();
  const t = useTranslations('Auth');
  if (auth.email === '') {
    router.push('/forget-password');
  }
  const form = useForm<z.infer<typeof resetForgotPasswordSchema>>({
    resolver: zodResolver(resetForgotPasswordSchema),
    defaultValues: {
      email: auth.email || '',
      password: '',
      confirmNewPassword: '',
    },
  });
  const handleSubmit = async (
    values: z.infer<typeof resetForgotPasswordSchema>,
  ) => {
    await auth.reset(values);
  };
  return (
    <section className="max-h-screen w-full lg:grid lg:min-h-[600px] lg:grid-cols-2">
      <div className="hidden bg-muted lg:block">
        <Image
          src="/assets/reset-password.png"
          alt="Image"
          width="1080"
          height="640"
          unoptimized
          className="h-screen object-contain dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <Form {...form}>
        <form
          id="user-login-form"
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex items-center justify-center py-12"
        >
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">{t('meta_reset_password')}</h1>
              <p className="text-balance text-muted-foreground">
                {t('meta_reset_your_password')}
              </p>
            </div>
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => {
                  return (
                    <FormItem className="w-full">
                      <FormLabel>{t('meta_new_password')}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t('meta_new_password')}
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
                name="confirmNewPassword"
                render={({ field }) => {
                  return (
                    <FormItem className="w-full">
                      <FormLabel>{t('meta_confirm_new_password')}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t('meta_confirm_new_password')}
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <Button type="submit" className="w-full">
                {t('meta_reset_password_btn')}
              </Button>
              <Button variant="outline" className="w-full">
                {t('meta_sign_up_with_google')}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              <span>{t('meta_do_not_have_account')}</span>
              <Link href="/sign-up" className="underline">
                {t('meta_sign_up_title')}
              </Link>
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
}
