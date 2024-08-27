import { useMutation } from '@tanstack/react-query';

import { fileUpdateAction, fileUploadAction } from '@/actions/file.actions';

export const useFileUploadMutation = () => {
  const mutation = useMutation({
    mutationFn: async ({ formData }: { formData: FormData }) =>
      fileUploadAction({ formData }),
  });
  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};

export const useFileUpdateMutation = () => {
  const mutation = useMutation({
    mutationFn: async ({
      formData,
      url,
    }: {
      formData: FormData;
      url: string;
    }) => fileUpdateAction({ formData, url }),
  });
  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};
