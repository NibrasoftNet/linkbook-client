'use server';

import { revalidatePath } from 'next/cache';

import axiosInstance from '@/lib/axiosInstance';
import { Env } from '@/libs/Env';

export const getDonationsList = async () => {
  try {
    const { data } = await axiosInstance.get(
      `${Env.API_URL}/donations/list/_me`,
    );
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getOthersDonationsList = async () => {
  try {
    const { data } = await axiosInstance.get(
      `${Env.API_URL}/donations/list/others`,
    );
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getRequestedDonationsList = async () => {
  try {
    const { data } = await axiosInstance.get(
      `${Env.API_URL}/applicant-to-donation/list/_me`,
    );
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const createDonationAction = async (formData: FormData) => {
  try {
    const { data } = await axiosInstance.post(`donations/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    revalidatePath('/[locale]/(main)/[userId]/donations/details', 'page');
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const updateDonationAction = async (donationWithIdData: {
  id: number;
  formData: FormData;
}) => {
  try {
    const { data } = await axiosInstance.patch(
      `donations/${donationWithIdData.id}`,
      donationWithIdData.formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    revalidatePath('/[locale]/(main)/[userId]/donations/details', 'page');
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getSingleDonationAction = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`donations/${id}`);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getSingleDonationByProductIdAction = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`donations/product/${id}`);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const cancelRequestDonationAction = async (id: string) => {
  try {
    const { data } = await axiosInstance.put(
      `applicant-to-donation/cancel/${id}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    revalidatePath('/[locale]/(main)/[userId]/donations/details', 'page');
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const applyRequestDonationAction = async (id: string) => {
  try {
    const { data } = await axiosInstance.post(
      `applicant-to-donation/${id}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    revalidatePath(
      '/[locale]/(main)/[userId]/donations/details/update',
      'page',
    );
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const acceptRequestDonationAction = async (id: string) => {
  try {
    const { data } = await axiosInstance.put(
      `applicant-to-donation/accept/${id}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    revalidatePath(
      '/[locale]/(main)/[userId]/donations/details/update',
      'page',
    );
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const rejectRequestDonationAction = async (id: string) => {
  try {
    const { data } = await axiosInstance.put(
      `applicant-to-donation/reject/${id}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    revalidatePath(
      '/[locale]/(main)/[userId]/donations/details/update',
      'page',
    );
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
