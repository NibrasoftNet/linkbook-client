import { useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';

import { Env } from '@/libs/Env';

export function useGetAllCitiesQuery() {
  return useSuspenseQuery({
    queryFn: async () => {
      const { data } = await axios.get(
        `${Env.NEXT_PUBLIC_API_URL}/address/find/all-cities`,
      );
      if (!data) return [];
      if (data) return data;
    },
    queryKey: ['all-cities'],
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchInterval: false,
    retry: true,
  });
}
