import { zodResolver } from '@hookform/resolvers/zod';
import * as React from 'react';
import { useForm } from 'react-hook-form';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useTranslations } from 'use-intl';
import type { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { useAuth } from '@/providers/AuthContext';
import type { AuthDrawerProp } from '@/types/auth.type';
import { OperationEnum } from '@/types/auth.type';
import { otpFormSchema } from '@/validations/otp-validation.schema';

export function AuthDrawer({
  openAuthDrawer,
  setOpenAuthDrawer,
  operation,
  email,
}: AuthDrawerProp) {
  const t = useTranslations('DrawerPage');
  const auth = useAuth();
  const form = useForm<z.infer<typeof otpFormSchema>>({
    resolver: zodResolver(otpFormSchema),
    defaultValues: {
      otp: '',
      email,
    },
  });
  async function onSubmit(data: z.infer<typeof otpFormSchema>) {
    if (operation === OperationEnum['confirm-account']) {
      await auth.confirmEmail(data);
    } else if (operation === OperationEnum['reset-password']) {
      await auth.verifyOtp(data);
    }
  }
  return (
    <Drawer open={openAuthDrawer} onOpenChange={setOpenAuthDrawer}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm space-y-8">
          <DrawerHeader>
            <DrawerTitle>{t('verification_otp')}</DrawerTitle>
            <DrawerDescription>{t('verification_otp-msg')}</DrawerDescription>
          </DrawerHeader>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex w-full flex-col items-center gap-4"
              >
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col items-center gap-4">
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DrawerFooter className="grid w-full grid-cols-1 gap-2 md:grid-cols-2">
                  <Button disabled={auth.isLoading} type="submit">
                    {t('verify-btn-msg')}
                  </Button>
                  <DrawerClose asChild>
                    <Button variant="outline">{t('cancel-btn-msg')}</Button>
                  </DrawerClose>
                </DrawerFooter>
              </form>
            </Form>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
