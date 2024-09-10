'use server';

import { revalidatePath } from 'next/cache';

import axiosInstance from '@/lib/axiosInstance';
import { Env } from '@/libs/Env';

export const getSwapsList = async () => {
  try {
    const { data } = await axiosInstance.get(`${Env.API_URL}/swaps/list/_me`);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getOthersSwapsList = async () => {
  try {
    const { data } = await axiosInstance.get(
      `${Env.API_URL}/swaps/list/others`,
    );
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getRequestedSwapsList = async () => {
  try {
    const { data } = await axiosInstance.get(
      `${Env.API_URL}/applicant-to-swap/list/_me`,
    );
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const createSwapAction = async (formData: FormData) => {
  try {
    const { data } = await axiosInstance.post(`swaps/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    revalidatePath('/[locale]/(main)/[userId]/swaps/details', 'page');
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getSingleSwapByProductIdAction = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`swaps/product/${id}`);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const updateSwapAction = async (donationWithIdData: {
  id: number;
  formData: FormData;
}) => {
  try {
    const { data } = await axiosInstance.patch(
      `swaps/${donationWithIdData.id}`,
      donationWithIdData.formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    revalidatePath('/[locale]/(main)/[userId]/swaps/details', 'page');
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getSingleSwapAction = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`swaps/${id}`);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const cancelRequestSwapAction = async (id: string) => {
  try {
    const { data } = await axiosInstance.put(
      `applicant-to-swap/cancel/${id}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    revalidatePath('/[locale]/(main)/[userId]/swaps/details', 'page');
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const applyRequestSwapAction = async (applySwapWithIdData: {
  id: number;
  formData: FormData;
}) => {
  try {
    const { data } = await axiosInstance.post(
      `applicant-to-swap/${applySwapWithIdData.id}`,
      applySwapWithIdData.formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    revalidatePath('/[locale]/(main)/[userId]/swaps/details/update', 'page');
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const acceptRequestSwapAction = async (id: string) => {
  try {
    const { data } = await axiosInstance.put(
      `applicant-to-swap/accept/${id}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    revalidatePath('/[locale]/(main)/[userId]/swaps/details/update', 'page');
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const rejectRequestSwapAction = async (id: string) => {
  try {
    const { data } = await axiosInstance.put(
      `applicant-to-swap/reject/${id}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    revalidatePath('/[locale]/(main)/[userId]/swaps/details/update', 'page');
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
