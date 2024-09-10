'use server';

// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

import axiosInstance from '@/lib/axiosInstance';
import { Env } from '@/libs/Env';
import type { FilterProps, PaginationProps, SortByProps } from '@/types/types';
import { SubscriptionStatusEnum } from '@/types/types';
import type { SearchFormValues } from '@/validations/search-schema.validation';

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

export const getSearchServiceAction = async (
  searchData: SearchFormValues,
  paginationParams: PaginationProps,
) => {
  try {
    // Determine the base path based on type and subscription
    const basePath = `${Env.API_URL}/${searchData.type.toLowerCase()}/list/${searchData.subscriptionStatus.toLowerCase()}`;

    // Initialize URL with pagination parameters
    let url = `${basePath}?page=${paginationParams.page}&limit=${paginationParams.limit}`;

    // Add multiple sortBy parameters if provided
    if (paginationParams.sortBy && paginationParams.sortBy.length > 0) {
      paginationParams.sortBy.forEach((sort: SortByProps) => {
        url += `&sortBy=${encodeURIComponent(sort.field)}:${encodeURIComponent(sort.direction)}`;
      });
    } else {
      url += '&sortBy=createdAt:DESC';
    }

    // Add filter parameters if provided
    if (paginationParams.filter && paginationParams.filter.length > 0) {
      paginationParams.filter.forEach((filter: FilterProps) => {
        const operation = encodeURIComponent(filter.operation);
        const field = encodeURIComponent(filter.field);

        if (Array.isArray(filter.value)) {
          // If the value is an array, join it with commas (useful for $in, $btw, etc.)
          const value = filter.value
            .map((v) => encodeURIComponent(v))
            .join(',');
          url += `&filter.${field}.${operation}=${value}`;
        } else if (filter.value !== undefined) {
          // For non-array values
          url += `&filter.${field}=${operation}:${encodeURIComponent(filter.value)}`;
        } else {
          // For operations that don't require a value (like $null)
          url += `&filter.${field}=${operation}`;
        }
      });
    } else {
      url += `&filter.product.category.id=$eq:${searchData.category}`;
    }

    const { data } =
      searchData.subscriptionStatus === SubscriptionStatusEnum.UNSUBSCRIBED
        ? await axios.get(url)
        : await axiosInstance.get(url);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getPaginatedSearchAction = async (url: string) => {
  try {
    const { data } = await axiosInstance.get(url);
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
