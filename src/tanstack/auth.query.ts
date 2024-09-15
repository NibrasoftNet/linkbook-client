import { useMutation } from '@tanstack/react-query';
import type * as z from 'zod';

import {
  activateNotificationAction,
  refreshTokenAction,
  updateSecurityAction,
  userConfirmEmailAction,
  userForgetPasswordAction,
  userLoginAction,
  userLogoutAction,
  userRegisterAction,
  userResetPasswordAction,
  userVerifyOtpAction,
} from '@/actions/auth.actions';
import type { otpFormSchema } from '@/validations/otp-validation.schema';
import type { userForgetPasswordValidationSchema } from '@/validations/user-forget-password-validation.schema';
import type { userLoginSchema } from '@/validations/user-login-validation.schema';
import type { userRegisterFormSchema } from '@/validations/user-register-validation.schema';
import type { resetForgotPasswordSchema } from '@/validations/user-reset-forgot-password-schema.validator';
import type { userResetPasswordFormSchema } from '@/validations/user-reset-password-schema.validator';

export const useCredentialsRegisterMutation = () => {
  const mutation = useMutation({
    mutationFn: async (userData: z.infer<typeof userRegisterFormSchema>) =>
      userRegisterAction(userData),
  });
  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};

export const useCredentialsLoginMutation = () => {
  const mutation = useMutation({
    mutationFn: async (userData: z.infer<typeof userLoginSchema>) =>
      userLoginAction(userData),
  });
  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};

export const useConfirmEmailMutation = () => {
  const mutation = useMutation({
    mutationFn: async (userData: z.infer<typeof otpFormSchema>) =>
      userConfirmEmailAction(userData),
  });
  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};

export const useForgetPasswordMutation = () => {
  const mutation = useMutation({
    mutationFn: async (
      email: z.infer<typeof userForgetPasswordValidationSchema>,
    ) => userForgetPasswordAction(email),
  });
  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};

export const useResetPasswordMutation = () => {
  const mutation = useMutation({
    mutationFn: async (resetData: z.infer<typeof resetForgotPasswordSchema>) =>
      userResetPasswordAction(resetData),
  });
  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};

export const useRefreshTokenMutation = () => {
  const mutation = useMutation({
    mutationFn: async (token: string) => refreshTokenAction(token),
  });
  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};

export const useLogoutMutation = () => {
  const mutation = useMutation({
    mutationFn: async (token: string) => userLogoutAction(token),
  });
  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};

export const useUpdateSecurityMutation = () => {
  const mutation = useMutation({
    mutationFn: async (
      securityData: z.infer<typeof userResetPasswordFormSchema>,
    ) => updateSecurityAction(securityData),
  });
  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};

export const useVerifyOtpMutation = () => {
  const mutation = useMutation({
    mutationFn: async (userData: z.infer<typeof otpFormSchema>) =>
      userVerifyOtpAction(userData),
  });
  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};

export const useActivateNotificationMutation = () => {
  const mutation = useMutation({
    mutationFn: async (token: string) => activateNotificationAction(token),
  });
  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};
