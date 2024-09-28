'use client';

// eslint-disable-next-line import/no-extraneous-dependencies
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { createContext, useContext, useLayoutEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { toast } from 'sonner';
import type * as z from 'zod';

import { getSession } from '@/actions/auth.actions';
import { useGetAllCitiesQuery } from '@/tanstack/address.query';
import {
  useActivateNotificationMutation,
  useConfirmEmailMutation,
  useCredentialsLoginMutation,
  useCredentialsRegisterMutation,
  useForgetPasswordMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
  useResetPasswordMutation,
  useVerifyOtpMutation,
} from '@/tanstack/auth.query';
import { useGetAllCategoriesQuery } from '@/tanstack/category.query';
import { useGetAllProductsQuery } from '@/tanstack/search.query';
import { useGetAllTestimonialsQuery } from '@/tanstack/testimonial.query';
import { useUpdateProfileMutation } from '@/tanstack/users.query';
import type { AuthValuesType } from '@/types/auth.type';
import type { User } from '@/types/users.type';
import type { otpFormSchema } from '@/validations/otp-validation.schema';
import type { userForgetPasswordValidationSchema } from '@/validations/user-forget-password-validation.schema';
import type { userLoginSchema } from '@/validations/user-login-validation.schema';
import type { userRegisterFormSchema } from '@/validations/user-register-validation.schema';
import type { resetForgotPasswordSchema } from '@/validations/user-reset-forgot-password-schema.validator';
import type { UserUpdateProfileFormType } from '@/validations/user-update-profile-schema.validator';
import useNotificationTokenStore from '@/zustand/notificationTokenStore';
import useSearchStore from '@/zustand/searchStore';

// ** Defaults
const defaultProvider: AuthValuesType = {
  session: null,
  setSession: () => {},
  register: (value: any) => Promise.resolve(value),
  login: (value: any) => Promise.resolve(value),
  confirmEmail: (value: any) => Promise.resolve(value),
  refresh: () => Promise.resolve(),
  forget: (value: any) => Promise.resolve(value),
  reset: (value: any) => Promise.resolve(value),
  verifyOtp: (value: any) => Promise.resolve(value),
  logout: () => Promise.resolve(),
  update: (value: any) => Promise.resolve(value),
  openAuthDrawer: false,
  setOpenAuthDrawer: () => Boolean,
  email: '',
  setEmail: () => String,
  connected: (value: any) => Promise.resolve(value),
  isLoading: false,
  setIsLoading: () => Boolean,
};
const AuthContext = createContext(defaultProvider);

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// Create the AuthContext
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<User | null>(defaultProvider.session);
  const [email, setEmail] = useState(defaultProvider.email);
  const [openAuthDrawer, setOpenAuthDrawer] = useState<boolean>(
    defaultProvider.openAuthDrawer,
  );
  const router = useRouter();
  const { setAllCities, setAllCategories, setAllProducts, setAllTestimonials } =
    useSearchStore();
  const { token } = useNotificationTokenStore();
  const { mutateAsync: mutateRegister, isLoading: isRegisterLoading } =
    useCredentialsRegisterMutation();
  const { mutateAsync: mutateLogin, isLoading: isLoginLoading } =
    useCredentialsLoginMutation();
  const { mutateAsync: mutateRefresh, isLoading: isRefreshLoading } =
    useRefreshTokenMutation();
  const { mutateAsync: mutateLogout, isLoading: isLogoutLoading } =
    useLogoutMutation();
  const { mutateAsync: mutateConfirmEmail, isLoading: isConfirmEmailLoading } =
    useConfirmEmailMutation();
  const {
    mutateAsync: mutateForgetPassword,
    isLoading: isForgetPasswordLoading,
  } = useForgetPasswordMutation();
  const {
    mutateAsync: mutateResetPassword,
    isLoading: isResetPasswordLoading,
  } = useResetPasswordMutation();
  const { mutateAsync: mutateVerifyOtp, isLoading: isVerifyOtpLoading } =
    useVerifyOtpMutation();
  const {
    mutateAsync: mutateUpdateProfile,
    isLoading: isUpdateProfileLoading,
  } = useUpdateProfileMutation();

  const { mutateAsync: mutateActivateNotification } =
    useActivateNotificationMutation();

  const { data: allCities } = useGetAllCitiesQuery();
  const { data: allCategories } = useGetAllCategoriesQuery();
  const { data: allProducts } = useGetAllProductsQuery();
  const { data: allTestimonials } = useGetAllTestimonialsQuery();

  const handleRegister = async (
    values: z.infer<typeof userRegisterFormSchema>,
  ) => {
    const toastId = toast('Begins...');
    toast.loading('Loading...', {
      description: 'Using sign-up...',
      id: toastId,
    });

    try {
      const { status, message } = await mutateRegister(values);
      if (!status) {
        toast.error('Failed', {
          description: Object.values(JSON.parse(message)).join(', '),
        });
        toast.dismiss(toastId);
        return;
      }
      toast.success('Success', {
        description: 'Register Successful',
        id: toastId,
      });
      setOpenAuthDrawer(true);
    } catch (e) {
      toast.error('Error', {
        description: `${e}`,
      });
    }
  };

  const handleLogin = async (values: z.infer<typeof userLoginSchema>) => {
    const toastId = toast('Begins...');
    toast.loading('Loading...', {
      description: 'Using sign-in...',
      id: toastId,
    });
    try {
      const { result, status, message, statusCode } = await mutateLogin(values);
      if (!status) {
        toast.error('Failed', {
          description: Object.values(JSON.parse(message)).join(', '),
        });
        toast.dismiss(toastId);
        if (statusCode === 403) {
          setOpenAuthDrawer(true);
        }
        return;
      }
      setSession(result.user);
      toast.success('Success', {
        description: 'Login Successful',
        id: toastId,
      });
      router.push(`${result.user.id}/dashboard`);
    } catch (e) {
      toast.error('Error', {
        description: `${e}`,
      });
    }
  };

  const handleConfirmEmail = async (values: z.infer<typeof otpFormSchema>) => {
    const toastId = toast('Begins...');
    toast.loading('Loading...', {
      description: 'Using sign-up...',
      id: toastId,
    });

    try {
      const { status, message } = await mutateConfirmEmail(values);
      if (!status) {
        toast.error('Failed', {
          description: Object.values(JSON.parse(message)).join(', '),
        });
        toast.dismiss(toastId);
        return;
      }
      toast.success('Success', {
        description: 'Confirmation Successful',
        id: toastId,
      });
      setOpenAuthDrawer(false);
      router.push('/sign-in');
    } catch (e) {
      toast.error('Error', {
        description: `${e}`,
      });
    }
  };

  const handleForgetPassword = async (
    values: z.infer<typeof userForgetPasswordValidationSchema>,
  ) => {
    const toastId = toast('Begins...');
    toast.loading('Loading...', {
      description: 'Forget Password...',
      id: toastId,
    });

    try {
      const { status, message } = await mutateForgetPassword(values);
      if (!status) {
        toast.error('Failed', {
          description: Object.values(JSON.parse(message)).join(', '),
        });
        toast.dismiss(toastId);
        return;
      }
      toast.success('Success', {
        description: 'Email is send to your email address with OTP',
        id: toastId,
      });
      setOpenAuthDrawer(true);
    } catch (e) {
      toast.error('Error', {
        description: `${e}`,
      });
    }
  };

  const handleResetPassword = async (
    values: z.infer<typeof resetForgotPasswordSchema>,
  ) => {
    const toastId = toast('Begins...');
    toast.loading('Loading...', {
      description: 'Reset Password...',
      id: toastId,
    });

    try {
      const { status, message } = await mutateResetPassword(values);
      if (!status) {
        toast.error('Failed', {
          description: Object.values(JSON.parse(message)).join(', '),
        });
        toast.dismiss(toastId);
        return;
      }
      toast.success('Success', {
        description: 'Reset Password Successful',
        id: toastId,
      });
      router.push('/sign-in');
    } catch (e) {
      toast.error('Error', {
        description: `${e}`,
      });
    }
  };
  // eslint-disable-next-line consistent-return
  const handleRefresh = async (): Promise<void> => {
    try {
      const cookiesSession = await getSession();
      if (!cookiesSession || !cookiesSession.refreshToken) {
        router.push('/sign-in');
      }
      const { result, status } = await mutateRefresh(
        cookiesSession?.refreshToken as string,
      );
      if (status) {
        setSession(result.user);
        return;
      }
      setSession(null);
      router.push('/sign-in');
    } catch (e) {
      router.push('/sign-up');
    }
  };

  const handleLogout = async () => {
    try {
      const cookiesSession = await getSession();
      if (!cookiesSession || !cookiesSession.token) {
        router.push('/sign-in');
      }
      const { status } = await mutateLogout(cookiesSession?.token as string);
      if (status) {
        setSession(null);
        router.push('/sign-in');
      } else {
        setSession(null);
        router.push('/sign-up');
      }
    } catch (e) {
      router.push('/sign-up');
    }
  };

  const handleVerifyOtp = async (values: z.infer<typeof otpFormSchema>) => {
    const toastId = toast('Begins...');
    toast.loading('Loading...', {
      description: 'OTP verification...',
      id: toastId,
    });

    try {
      const { status, message } = await mutateVerifyOtp(values);
      if (!status) {
        toast.error('Failed', {
          description: Object.values(JSON.parse(message)).join(', '),
        });
        toast.dismiss(toastId);
        return;
      }
      toast.success('Success', {
        description: 'Verification Successful',
        id: toastId,
      });
      setOpenAuthDrawer(false);
      setEmail(values.email);
      router.push(`/reset-password`);
    } catch (e) {
      toast.error('Error', {
        description: `${e}`,
      });
    }
  };

  const handleUpdateProfile = async (
    id: number,
    userData: Partial<UserUpdateProfileFormType>,
  ) => {
    const formData = new FormData();
    if (userData.photo) {
      formData.append('files', userData.photo);
    }
    formData.append(
      'data',
      JSON.stringify({
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
        address: userData.address,
      }),
    );
    const toastId = toast('Begins...');
    toast.loading('Loading...', {
      description: 'Profile update...',
      id: toastId,
    });
    try {
      const { status, message } = await mutateUpdateProfile({ id, formData });
      if (!status) {
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
  };

  const handleSearchParams = async (): Promise<void> => {
    setAllCities(allCities?.result ?? []);
    setAllCategories(allCategories?.result ?? []);
    setAllProducts(allProducts?.result ?? []);
    setAllTestimonials(allTestimonials?.result?.data ?? []);
  };

  const handleClientSession = async (): Promise<void> => {
    const cookiesSession = await getSession();
    if (token) {
      await mutateActivateNotification(token);
    }
    setSession(cookiesSession?.user ?? null);
  };

  useLayoutEffect(() => {
    handleClientSession();
    handleSearchParams();
  }, []);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const values: any = {
    session,
    register: handleRegister,
    login: handleLogin,
    refresh: handleRefresh,
    logout: handleLogout,
    confirmEmail: handleConfirmEmail,
    forget: handleForgetPassword,
    reset: handleResetPassword,
    verifyOtp: handleVerifyOtp,
    update: handleUpdateProfile,
    openAuthDrawer,
    setOpenAuthDrawer,
    email,
    setSession,
    isLoading:
      isLoginLoading ||
      isRegisterLoading ||
      isForgetPasswordLoading ||
      isResetPasswordLoading ||
      isVerifyOtpLoading ||
      isConfirmEmailLoading ||
      isRefreshLoading ||
      isLogoutLoading ||
      isUpdateProfileLoading,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
