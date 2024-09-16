import axiosInstance from '@/lib/axiosInstance';
import { Env } from '@/libs/Env';
import type { PaginationProps } from '@/types/types';

export const getMyNotificationsList = async (
  paginationParams: PaginationProps,
) => {
  try {
    // Set default values for pagination
    const { page = 1, limit = 20 } = paginationParams || {};

    // Construct the URL with pagination parameters
    const url = `${Env.API_URL}/notifications/all/_me?page=${page}&limit=${limit}`;

    const { data } = await axiosInstance.get(url);
    return data;
  } catch (error: any) {
    return error.response.data ?? error;
  }
};
