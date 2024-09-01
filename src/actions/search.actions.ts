'use server';

// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

import type { SearchFormValues } from '@/components/map/SearchProduct';
import axiosInstance from '@/lib/axiosInstance';
import { Env } from '@/libs/Env';
import { SubscriptionStatusEnum } from '@/types/types';

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

export const getSearchServiceAction = async (searchData: SearchFormValues) => {
  try {
    // Determine the base path based on type and subscription
    const basePath = `${Env.API_URL}/${searchData.type.toLowerCase()}/list/${searchData.subscriptionStatus.toLowerCase()}`;

    // Base URL
    let url = `${basePath}?page=1&limit=20&sortBy=createdAt:DESC&filter.product.category.id=$eq:${searchData.category}`;

    // Add the street filter if it's provided
    if (searchData.city) {
      url += `&filter.address.street=$eq:${encodeURIComponent(searchData.city)}`;
    }
    console.log('url', url);
    const { data } =
      searchData.subscriptionStatus === SubscriptionStatusEnum.UNSUBSCRIBED
        ? await axios.get(url)
        : await axiosInstance.get(url);
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
