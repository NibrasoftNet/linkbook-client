'use server';

// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import type * as z from 'zod';

import { createSession, decrypt, destroySession } from '@/lib/auth';
// eslint-disable-next-line import/no-cycle
import axiosInstance from '@/lib/axiosInstance';
import { Env } from '@/libs/Env';
import type { ServerSessionPros, SessionProps } from '@/types/auth.type';
import type { AxiosCustomResponse } from '@/types/types';
import type { otpFormSchema } from '@/validations/otp-validation.schema';
import type { userForgetPasswordValidationSchema } from '@/validations/user-forget-password-validation.schema';
import type { userLoginSchema } from '@/validations/user-login-validation.schema';
import type { userRegisterFormSchema } from '@/validations/user-register-validation.schema';
import type { resetForgotPasswordSchema } from '@/validations/user-reset-forgot-password-schema.validator';
import type { userResetPasswordFormSchema } from '@/validations/user-reset-password-schema.validator';

export const userRegisterAction = async (
  registerData: z.infer<typeof userRegisterFormSchema>,
) => {
  try {
    const { data } = await axios.post(
      `${Env.API_URL}/auth/email/register`,
      registerData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return data;
  } catch (error: any) {
    return error.response.data ?? error;
  }
};

export const userLoginAction = async (
  loginData: z.infer<typeof userLoginSchema>,
) => {
  try {
    const { data } = await axios.post<AxiosCustomResponse<SessionProps>>(
      `${Env.API_URL}/auth/email/login`,
      loginData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    // Create the session
    await createSession(data.result);
    return data;
  } catch (error: any) {
    return error.response.data ?? error;
  }
};

export const userConfirmEmailAction = async (
  confirmEmailData: z.infer<typeof otpFormSchema>,
) => {
  try {
    const { data } = await axios.post(
      `${Env.API_URL}/auth/email/confirm`,
      confirmEmailData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return data;
  } catch (error: any) {
    return error.response.data ?? error;
  }
};

export const userForgetPasswordAction = async (
  forgetEmailData: z.infer<typeof userForgetPasswordValidationSchema>,
) => {
  try {
    const { data } = await axios.post(
      `${Env.API_URL}/auth/forgot/password`,
      forgetEmailData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return data;
  } catch (error: any) {
    return error.response.data ?? error;
  }
};

export const userResetPasswordAction = async (
  resetData: z.infer<typeof resetForgotPasswordSchema>,
) => {
  try {
    const { data } = await axios.post(
      `${Env.API_URL}/auth/reset/password`,
      resetData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return data;
  } catch (error: any) {
    return error.response.data ?? error;
  }
};

export const refreshTokenAction = async (token: string) => {
  try {
    const { data } = await axios.post(
      `${Env.API_URL}/auth/refresh`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    await createSession(data.result);
    return data;
  } catch (error: any) {
    return error.response.data ?? error;
  }
};

export const userLogoutAction = async (token: string) => {
  try {
    const { data } = await axios.post(
      `${Env.API_URL}/auth/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    await destroySession();
    return data;
  } catch (error: any) {
    return error.response.data ?? error;
  }
};

export const getProfileAction = async ({
  accessToken,
  token,
}: {
  accessToken: string;
  token?: string;
}) => {
  try {
    let url = `${Env.API_URL}/auth/me`;
    if (token) {
      url += `?token=${token}`;
    }

    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    await createSession(data.result);
    return data.result;
  } catch (error: any) {
    console.log(error);
    return error.response.data ?? error;
  }
};

export const updateProfileAction = async (userWithIdData: {
  id: number;
  formData: FormData;
}) => {
  try {
    const { data } = await axiosInstance.patch(
      'auth/me',
      userWithIdData.formData,
    );
    revalidatePath('/[locale]/(main)/[userId]/profile', 'page');
    return data;
  } catch (error: any) {
    return error.response.data ?? error;
  }
};

export const updateSecurityAction = async (
  securityData: z.infer<typeof userResetPasswordFormSchema>,
) => {
  try {
    const { data } = await axiosInstance.put(
      'auth/new-password/me',
      securityData,
    );
    return data;
  } catch (error: any) {
    return error.response.data ?? error;
  }
};

export const userVerifyOtpAction = async (
  otpVerifyData: z.infer<typeof otpFormSchema>,
) => {
  try {
    const { data } = await axios.post(
      `${Env.API_URL}/otp/verify`,
      otpVerifyData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return data;
  } catch (error: any) {
    return error.response.data ?? error;
  }
};

export const activateNotificationAction = async (token: string) => {
  try {
    const { data } = await axiosInstance.put('auth/google/activate', {
      notificationToken: token,
    });
    return data;
  } catch (error: any) {
    return error.response.data ?? error;
  }
};

export async function getSession(): Promise<ServerSessionPros | null> {
  const session = cookies().get('session')?.value as string;
  if (!session) return null;
  return decrypt(session);
}
