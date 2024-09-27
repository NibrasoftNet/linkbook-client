'use server';

import { revalidatePath } from 'next/cache';

import axiosInstance from '@/lib/axiosInstance';
import { Env } from '@/libs/Env';
import type { PaginationProps } from '@/types/types';

export const getCommunityFeedListAction = async () => {
  try {
    const { data } = await axiosInstance.get(`${Env.API_URL}/community-feeds`);
    return data;
  } catch (error: any) {
    return error.response.data ?? error;
  }
};

export const getCommunityFeedListRelatedMeAction = async (
  paginationParams: PaginationProps,
) => {
  try {
    // Set default values for pagination
    const { page = 1, limit = 20 } = paginationParams || {};

    // Construct the URL with pagination parameters
    const url = `${Env.API_URL}/community-feeds/related/_me?page=${page}&limit=${limit}`;

    const { data } = await axiosInstance.get(url);
    return data;
  } catch (error: any) {
    return error.response.data ?? error;
  }
};

export const getCommunityFeedListMeAction = async (
  paginationParams: PaginationProps,
) => {
  try {
    // Set default values for pagination
    const { page = 1, limit = 20 } = paginationParams || {};

    // Construct the URL with pagination parameters
    const url = `${Env.API_URL}/community-feeds/_me?page=${page}&limit=${limit}`;

    const { data } = await axiosInstance.get(url);
    return data;
  } catch (error: any) {
    return error.response.data ?? error;
  }
};

export const createCommunityFeedAction = async (formData: FormData) => {
  try {
    const { data } = await axiosInstance.post(`community-feeds/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    revalidatePath('/[locale]/(main)/[userId]/feeds/details', 'page');
    return data;
  } catch (error: any) {
    return error.response.data ?? error;
  }
};

export const updateCommunityFeedAction = async (communityFeedWithIdData: {
  id: number;
  formData: FormData;
}) => {
  try {
    const { data } = await axiosInstance.patch(
      `community-feeds/${communityFeedWithIdData.id}`,
      communityFeedWithIdData.formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    revalidatePath('/[locale]/(main)/[userId]/feeds/details', 'page');
    return data;
  } catch (error: any) {
    return error.response.data ?? error;
  }
};

export const getSingleCommunityFeedAction = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`community-feeds/${id}`);
    return data;
  } catch (error: any) {
    return error.response.data ?? error;
  }
};
