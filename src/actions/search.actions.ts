'use server';

// eslint-disable-next-line import/no-extraneous-dependencies
import axiosInstance from '@/lib/axiosInstance';

// @ts-ignore
// eslint-disable-next-line consistent-return
export const getUsersHistory = async () => {
  try {
    const { data } = await axiosInstance.get('/search');
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const deleteHistoryAction = async (id: number) => {
  try {
    const { data } = await axiosInstance.delete(`search/${id}`);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
