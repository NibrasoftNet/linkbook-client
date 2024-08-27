'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
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
import { useAuth } from '@/providers/AuthContext';
import { OperationEnum } from '@/types/auth.type';
import { userForgetPasswordValidationSchema } from '@/validations/user-forget-password-validation.schema';

export default function SignUp() {
  const auth = useAuth();
  const t = useTranslations('Auth');
  const form = useForm<z.infer<typeof userForgetPasswordValidationSchema>>({
    resolver: zodResolver(userForgetPasswordValidationSchema),
  });
  const handleSubmit = async (
    values: z.infer<typeof userForgetPasswordValidationSchema>,
  ) => {
    await auth.forget(values);
  };
  return (
    <>
      <Card className="mx-auto min-h-[50vh] min-w-[50vh]">
        <CardHeader>
          <CardTitle className="text-xl">{t('meta_forget_password')}</CardTitle>
          <CardDescription>
            {t('meta_forget_password_description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              id="user-register-form"
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
              <Button
                disabled={auth.isLoading}
                type="submit"
                className="w-full"
              >
                {t('meta_email_verify')}
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            {t('meta_return_sign_in')}
            <Link href="/sign-in" className="underline">
              {t('meta_sign_in_title')}
            </Link>
          </div>
        </CardContent>
      </Card>
      {auth?.openAuthDrawer && (
        <AuthDrawer
          openAuthDrawer={auth?.openAuthDrawer}
          setOpenAuthDrawer={auth?.setOpenAuthDrawer}
          operation={OperationEnum['reset-password']}
          email={form.getValues('email')}
        />
      )}
    </>
  );
}
