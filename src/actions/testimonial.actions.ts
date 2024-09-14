'use server';

import axiosInstance from '@/lib/axiosInstance';
import type { TestimonialFormValues } from '@/validations/create-testimonial-schema.validation';

export const createTestimonialAction = async (
  testimonialData: TestimonialFormValues,
) => {
  try {
    const { data } = await axiosInstance.post(
      '/testimonials',
      testimonialData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
