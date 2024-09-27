'use client';

import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { toast } from 'sonner';

import { defaultPaginationLimit } from '@/lib/constants';
import {
  useAcceptRequestCommunityMutation,
  useApplyRequestCommunityMutation,
  useCancelRequestCommunityMutation,
  useCreateCommunityMutation,
  useRejectRequestCommunityMutation,
  useUpdateCommunityMutation,
} from '@/tanstack/community.query';
import type { CommunityContextType } from '@/types/community.type';
import type { CommunitySchemaFormType } from '@/validations/create-community-schema.validator';

// ** Defaults
const defaultProvider: CommunityContextType = {
  create: (value: any) => Promise.resolve(value),
  update: (value: any) => Promise.resolve(value),
  delete: (value: any) => Promise.resolve(value),
  apply: (value: any) => Promise.resolve(value),
  accept: (value: any) => Promise.resolve(value),
  reject: (value: any) => Promise.resolve(value),
  cancel: (value: any) => Promise.resolve(value),
  isLoading: false,
  setIsLoading: () => Boolean,
};
const CommunityContext = createContext(defaultProvider);

// Custom hook
export const useCommunity = () => useContext(CommunityContext);

// Create the AuthContext
const CommunityProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const {
    mutateAsync: mutateCreateCommunity,
    isLoading: isCreateCommunityLoading,
  } = useCreateCommunityMutation();

  const {
    mutateAsync: mutateUpdateCommunity,
    isLoading: isUpdateCommunityLoading,
  } = useUpdateCommunityMutation();

  const {
    mutateAsync: mutateApplyRequestMutation,
    isLoading: isApplyRequestCommunityLoading,
  } = useApplyRequestCommunityMutation();

  const {
    mutateAsync: mutateAcceptRequestCommunity,
    isLoading: isAcceptRequestCommunityLoading,
  } = useAcceptRequestCommunityMutation();

  const {
    mutateAsync: mutateRejectRequestDonation,
    isLoading: isRejectRequestCommunityLoading,
  } = useRejectRequestCommunityMutation();

  const {
    mutateAsync: mutateCancelRequestCommunity,
    isLoading: isCancelRequestCommunityLoading,
  } = useCancelRequestCommunityMutation();

  const handleCreateCommunity = async (
    communityData: CommunitySchemaFormType,
  ) => {
    const formData = new FormData();
    if (communityData.files?.length) {
      formData.append('file', communityData.files[0]!);
    }
    formData.append(
      'data',
      JSON.stringify({
        name: communityData.name,
        bio: communityData.bio,
        isPrivate: communityData.isPrivate,
      }),
    );
    const toastId = toast('Begins...');
    toast.loading('Loading...', {
      description: 'Create Community...',
      id: toastId,
    });

    try {
      const { status, message } = await mutateCreateCommunity(formData);
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

  const handleUpdateCommunity = async (
    id: number,
    communityData: Partial<CommunitySchemaFormType>,
  ) => {
    const toastId = toast('Begins...');
    toast.loading('Loading...', {
      description: 'Update Community...',
      id: toastId,
    });

    const formData = new FormData();
    formData.append(
      'data',
      JSON.stringify({
        name: communityData.name,
        bio: communityData.bio,
        isPrivate: communityData.isPrivate,
      }),
    );

    try {
      const { status, message } = await mutateUpdateCommunity({ id, formData });
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

  const handleApplyRequestCommunity = async (id: string) => {
    const toastId = toast('Begins...');
    toast.loading('Loading...', {
      description: 'Sending Request...',
      id: toastId,
    });

    try {
      const { status, message } = await mutateApplyRequestMutation(id);
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
    } catch (e) {
      toast.error('Error', {
        description: `${e}`,
      });
      toast.dismiss(toastId);
    }
  };

  const handleAcceptRequestDonation = async (id: string) => {
    const toastId = toast('Begins...');
    toast.loading('Loading...', {
      description: 'Accept Request...',
      id: toastId,
    });

    try {
      const { status, message } = await mutateAcceptRequestCommunity(id);
      if (!status) {
        toast.error('Failed', {
          description: Object.values(JSON.parse(message)).join(', '),
        });
        toast.dismiss(toastId);
        return;
      }
      toast.success('Success', {
        description: 'Operation Success',
        id: toastId,
      });
    } catch (e) {
      toast.error('Error', {
        description: `${e}`,
      });
      toast.dismiss(toastId);
    }
  };

  const handleRejectRequestDonation = async (id: string) => {
    const toastId = toast('Begins...');
    toast.loading('Loading...', {
      description: 'Reject Operation...',
      id: toastId,
    });

    try {
      const { status, message } = await mutateRejectRequestDonation(id);
      if (!status) {
        toast.error('Failed', {
          description: Object.values(JSON.parse(message)).join(', '),
        });
        toast.dismiss(toastId);
        return;
      }
      toast.success('Success', {
        description: 'Reject Success',
        id: toastId,
      });
    } catch (e) {
      toast.error('Error', {
        description: `${e}`,
      });
      toast.dismiss(toastId);
    }
  };

  const handleCancelCommunityRequest = async (id: string) => {
    const toastId = toast('Begins...');
    toast.loading('Loading...', {
      description: 'Start Operation...',
      id: toastId,
    });
    try {
      const { status, message } = await mutateCancelRequestCommunity(id);
      if (!status) {
        toast.error('Failed', {
          description: Object.values(JSON.parse(message)).join(', '),
        });
        toast.dismiss(toastId);
      }
      toast.success('Success', {
        description: 'Operation Successful',
        id: toastId,
      });
    } catch (e) {
      toast.error('Error', {
        description: `${e}`,
      });
      toast.dismiss(toastId);
    }
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const values: any = {
    create: handleCreateCommunity,
    update: handleUpdateCommunity,
    delete: handleCreateCommunity,
    apply: handleApplyRequestCommunity,
    accept: handleAcceptRequestDonation,
    reject: handleRejectRequestDonation,
    cancel: handleCancelCommunityRequest,
    isLoading:
      isCreateCommunityLoading ||
      isUpdateCommunityLoading ||
      isAcceptRequestCommunityLoading ||
      isRejectRequestCommunityLoading ||
      isApplyRequestCommunityLoading ||
      isCancelRequestCommunityLoading,
  };

  return (
    <CommunityContext.Provider value={values}>
      {children}
    </CommunityContext.Provider>
  );
};

export default CommunityProvider;
