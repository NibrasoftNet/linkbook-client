'use client';

import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';
import { toast } from 'sonner';

import { defaultPaginationLimit } from '@/lib/constants';
import {
  useCreateCommunityFeedMutation,
  useUpdateCommunityFeedMutation,
} from '@/tanstack/community-feed.query';
import type { CommunityFeedContextType } from '@/types/community-feed.type';
import type { CommunityFeedSchemaFormType } from '@/validations/create-community-feed-schema.validator';

// ** Defaults
const defaultProvider: CommunityFeedContextType = {
  create: (value: any) => Promise.resolve(value),
  update: (value: any) => Promise.resolve(value),
  delete: (value: any) => Promise.resolve(value),
  isLoading: false,
  setIsLoading: () => Boolean,
};
const CommunityFeedContext = createContext(defaultProvider);

// Custom hook
export const useCommunityFeed = () => useContext(CommunityFeedContext);

// Create the AuthContext
const CommunityFeedProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const {
    mutateAsync: mutateCreateCommunityFeed,
    isLoading: isCreateCommunityFeedLoading,
  } = useCreateCommunityFeedMutation();

  const {
    mutateAsync: mutateUpdateCommunityFeed,
    isLoading: isUpdateCommunityFeedLoading,
  } = useUpdateCommunityFeedMutation();

  const handleCreateCommunityFeed = async (
    communityFeedData: CommunityFeedSchemaFormType,
  ) => {
    const formData = new FormData();
    if (communityFeedData.files?.length) {
      communityFeedData.files.forEach((file) => {
        formData.append('files', file);
      });
    }
    formData.append(
      'data',
      JSON.stringify({
        title: communityFeedData.title,
        url: communityFeedData.url,
        description: communityFeedData.description,
        communityId: communityFeedData.communityId,
      }),
    );
    const toastId = toast('Begins...');
    toast.loading('Loading...', {
      description: 'Create Feed...',
      id: toastId,
    });

    try {
      const { status, message } = await mutateCreateCommunityFeed(formData);
      if (!status) {
        toast.error('Failed', {
          description: Object.values(JSON.parse(message)).join(', '),
        });
        toast.dismiss(toastId);
        return;
      }
      toast.success('Success', {
        description: 'Creation Success',
        id: toastId,
      });
      router.push(`../details?page=1&limit=${defaultPaginationLimit}`);
    } catch (e) {
      toast.error('Error', {
        description: `${e}`,
      });
      toast.dismiss(toastId);
    }
  };

  const handleUpdateCommunityFeed = async (
    id: number,
    communityFeedData: Partial<CommunityFeedSchemaFormType>,
  ) => {
    const toastId = toast('Begins...');
    toast.loading('Loading...', {
      description: 'Update Feed...',
      id: toastId,
    });

    const formData = new FormData();
    formData.append(
      'data',
      JSON.stringify({
        title: communityFeedData.title,
        url: communityFeedData.url,
        description: communityFeedData.description,
        communityId: communityFeedData.communityId,
      }),
    );

    try {
      const { status, message } = await mutateUpdateCommunityFeed({
        id,
        formData,
      });
      if (!status) {
        toast.error('Failed', {
          description: Object.values(JSON.parse(message)).join(', '),
        });
        toast.dismiss(toastId);
        return;
      }
      toast.success('Success', {
        description: 'Update Success',
        id: toastId,
      });
      router.push(`../details?page=1&limit=${defaultPaginationLimit}`);
    } catch (e) {
      toast.error('Error', {
        description: `${e}`,
      });
      toast.dismiss(toastId);
    }
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const values: any = {
    create: handleCreateCommunityFeed,
    update: handleUpdateCommunityFeed,
    delete: handleCreateCommunityFeed,
    isLoading: isCreateCommunityFeedLoading || isUpdateCommunityFeedLoading,
  };

  return (
    <CommunityFeedContext.Provider value={values}>
      {children}
    </CommunityFeedContext.Provider>
  );
};

export default CommunityFeedProvider;
