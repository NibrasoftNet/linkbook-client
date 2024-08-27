'use server';

import axiosInstance from '@/lib/axiosInstance';
import type { UpdateUser } from '@/types/users.type';

// @ts-ignore
// eslint-disable-next-line consistent-return
export const getUsersList = async () => {
  try {
    const { data } = await axiosInstance.get('/users');
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const editUserAction = async (
  id: number,
  status: Partial<UpdateUser>,
) => {
  try {
    const { data } = await axiosInstance.patch(`users/${id}`, status);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
