'use server';

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

export const createDonationAction = async (formData: FormData) => {
  try {
    const { data } = await axiosInstance.post(`donations/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
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
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getSingleDonationAction = async (id: number) => {
  try {
    const { data } = await axiosInstance.get(`donations/${id}`);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
