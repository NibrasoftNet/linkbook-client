import { useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';

import { Env } from '@/libs/Env';

export function useGetAllCategoriesQuery() {
  return useSuspenseQuery({
    queryFn: async () => {
      const { data } = await axios.get(
        `${Env.NEXT_PUBLIC_API_URL}/category/find/all-categories`,
      );
      if (!data) return [];
      if (data) return data;
    },
    queryKey: ['all-categories'],
    staleTime: 3600 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
  });
}
