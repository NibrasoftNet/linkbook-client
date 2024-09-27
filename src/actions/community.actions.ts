'use server';

import { revalidatePath } from 'next/cache';

import axiosInstance from '@/lib/axiosInstance';
import { Env } from '@/libs/Env';
import type { PaginationProps } from '@/types/types';

export const getCommunityList = async () => {
  try {
    const { data } = await axiosInstance.get(`${Env.API_URL}/communities`);
    return data;
  } catch (error: any) {
    return error.response.data ?? error;
  }
};

export const getAllCommunityList = async () => {
  try {
    const { data } = await axiosInstance.get(
      `${Env.NEXT_PUBLIC_API_URL}/communities/find/all-communities`,
    );
    return data;
  } catch (error: any) {
    return error.response.data ?? error;
  }
};

export const getMyCommunityList = async () => {
  try {
    const { data } = await axiosInstance.get(
      `${Env.API_URL}/communities/list/_me`,
    );
    return data;
  } catch (error: any) {
    return error.response.data ?? error;
  }
};

export const getCommunityListMePrivateUnsubscribed = async (
  paginationParams: PaginationProps,
) => {
  try {
    // Set default values for pagination
    const { page = 1, limit = 20 } = paginationParams || {};

    // Construct the URL with pagination parameters
    const url = `${Env.API_URL}/communities/list-private-unsubscribed/_me?page=${page}&limit=${limit}`;

    const { data } = await axiosInstance.get(url);
    return data;
  } catch (error: any) {
    return error.response.data ?? error;
  }
};

export const getRequestedCommunityList = async () => {
  try {
    const { data } = await axiosInstance.get(
      `${Env.API_URL}/applicant-to-community/list/_me`,
    );
    return data;
  } catch (error: any) {
    return error.response.data ?? error;
  }
};

export const createCommunityDataAction = async (formData: FormData) => {
  try {
    const { data } = await axiosInstance.post(`communities/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    revalidatePath('/[locale]/(main)/[userId]/communities/details', 'page');
    return data;
  } catch (error: any) {
    return error.response.data ?? error;
  }
};

export const updateCommunityAction = async (communityWithIdData: {
  id: number;
  formData: FormData;
}) => {
  try {
    const { data } = await axiosInstance.patch(
      `communities/${communityWithIdData.id}`,
      communityWithIdData.formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    revalidatePath('/[locale]/(main)/[userId]/communities/details', 'page');
    return data;
  } catch (error: any) {
    return error.response.data ?? error;
  }
};

export const getSingleCommunityAction = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`communities/${id}`);
    return data;
  } catch (error: any) {
    return error.response.data ?? error;
  }
};

export const cancelRequestCommunityAction = async (id: string) => {
  try {
    const { data } = await axiosInstance.put(
      `applicant-to-community/cancel/${id}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    revalidatePath('/[locale]/(main)/[userId]/communities/details', 'page');
    return data;
  } catch (error: any) {
    return error.response.data ?? error;
  }
};

export const applyRequestCommunityAction = async (id: string) => {
  try {
    const { data } = await axiosInstance.post(
      `applicant-to-community/${id}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    revalidatePath('/[locale]/(main)/[userId]/communities/details', 'page');
    return data;
  } catch (error: any) {
    return error.response.data ?? error;
  }
};

export const acceptRequestCommunityAction = async (id: string) => {
  try {
    const { data } = await axiosInstance.put(
      `applicant-to-community/accept/${id}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    revalidatePath(
      '/[locale]/(main)/[userId]/communities/details/update',
      'page',
    );
    return data;
  } catch (error: any) {
    return error.response.data ?? error;
  }
};

export const rejectRequestCommunityAction = async (id: string) => {
  try {
    const { data } = await axiosInstance.put(
      `applicant-to-community/reject/${id}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    revalidatePath(
      '/[locale]/(main)/[userId]/communities/details/update',
      'page',
    );
    return data;
  } catch (error: any) {
    return error.response.data ?? error;
  }
};
