import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';

import { createTestimonialAction } from '@/actions/testimonial.actions';
import { Env } from '@/libs/Env';
import type { TestimonialFormValues } from '@/validations/create-testimonial-schema.validation';

export const useCreateTestimonialMutation = () => {
  const mutation = useMutation({
    mutationFn: async (testimonialData: TestimonialFormValues) =>
      createTestimonialAction(testimonialData),
  });
  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};

export function useGetAllTestimonialsQuery() {
  return useSuspenseQuery({
    queryFn: async () => {
      const { data } = await axios.get(
        `${Env.NEXT_PUBLIC_API_URL}/testimonials`,
      );
      if (!data) return [];
      return data;
    },
    queryKey: ['all-testimonials'],
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchInterval: false,
    retry: true,
  });
}
