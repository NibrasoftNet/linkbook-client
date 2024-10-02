'use client';

import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { toast } from 'sonner';

import { defaultPaginationLimit } from '@/lib/constants';
import {
  useAcceptRequestSwapMutation,
  useApplyRequestSwapMutation,
  useCancelRequestSwapMutation,
  useCreateSwapMutation,
  useRejectRequestSwapMutation,
  useUpdateSwapMutation,
} from '@/tanstack/swaps.query';
import type { SwapsContextType } from '@/types/swap.type';
import type { ApplyToSwapSchemaFormType } from '@/validations/apply-to-swap-schema.validator';
import type { SwapSchemaFormType } from '@/validations/create-swap-schema.validator';

// ** Defaults
const defaultProvider: SwapsContextType = {
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
const SwapContext = createContext(defaultProvider);

// Custom hook
export const useSwap = () => useContext(SwapContext);

// Create the AuthContext
const SwapProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { mutateAsync: mutateCreateSwap, isLoading: isCreateSwapLoading } =
    useCreateSwapMutation();

  const { mutateAsync: mutateUpdateSwap, isLoading: isUpdateSwapLoading } =
    useUpdateSwapMutation();

  const {
    mutateAsync: mutateApplyRequestSwap,
    isLoading: isApplyRequestSwapLoading,
  } = useApplyRequestSwapMutation();

  const {
    mutateAsync: mutateAcceptRequestSwap,
    isLoading: isAcceptRequestSwapLoading,
  } = useAcceptRequestSwapMutation();

  const {
    mutateAsync: mutateRejectRequestSwap,
    isLoading: isRejectRequestSwapLoading,
  } = useRejectRequestSwapMutation();

  const {
    mutateAsync: mutateCancelRequestSwap,
    isLoading: isCancelRequestSwapLoading,
  } = useCancelRequestSwapMutation();

  const handleCreateSwap = async (SwapData: SwapSchemaFormType) => {
    const formData = new FormData();
    if (SwapData.files) {
      SwapData.files.forEach((file) => {
        formData.append('files', file);
      });
    }
    formData.append(
      'data',
      JSON.stringify({
        description: SwapData.description,
        quantity: SwapData.quantity,
        product: SwapData.product,
        address: SwapData.address,
      }),
    );
    const toastId = toast('Begins...');
    toast.loading('Loading...', {
      description: 'Create Swap...',
      id: toastId,
    });

    try {
      const { status, message } = await mutateCreateSwap(formData);
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

  const handleUpdateSwap = async (
    id: number,
    SwapData: Partial<SwapSchemaFormType>,
  ) => {
    const toastId = toast('Begins...');
    toast.loading('Loading...', {
      description: 'Update Swap...',
      id: toastId,
    });

    const formData = new FormData();
    formData.append(
      'data',
      JSON.stringify({
        description: SwapData.description,
        quantity: SwapData.quantity,
        product: SwapData.product,
        address: SwapData.address,
      }),
    );

    try {
      const { status, message } = await mutateUpdateSwap({ id, formData });
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

  const handleApplyRequestSwap = async (
    id: number,
    applyToSwapData: Partial<ApplyToSwapSchemaFormType>,
  ) => {
    const toastId = toast('Begins...');
    toast.loading('Loading...', {
      description: 'Apply Swap...',
      id: toastId,
    });

    const formData = new FormData();
    if (applyToSwapData.files?.length) {
      applyToSwapData.files.forEach((file) => {
        formData.append('files', file);
      });
    }
    formData.append(
      'data',
      JSON.stringify({
        quantity: applyToSwapData.quantity,
        product: applyToSwapData.product,
      }),
    );

    try {
      const { status, message } = await mutateApplyRequestSwap({
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
        description: 'Apply Success',
        id: toastId,
      });
      router.back();
    } catch (e) {
      toast.error('Error', {
        description: `${e}`,
      });
      toast.dismiss(toastId);
    }
  };

  const handleAcceptRequestSwap = async (id: string) => {
    const toastId = toast('Begins...');
    toast.loading('Loading...', {
      description: 'Accept Swap...',
      id: toastId,
    });

    try {
      const { status, message } = await mutateAcceptRequestSwap(id);
      if (!status) {
        toast.error('Failed', {
          description: Object.values(JSON.parse(message)).join(', '),
        });
        toast.dismiss(toastId);
        return;
      }
      toast.success('Success', {
        description: 'Accept Success',
        id: toastId,
      });
    } catch (e) {
      toast.error('Error', {
        description: `${e}`,
      });
      toast.dismiss(toastId);
    }
  };

  const handleRejectRequestSwap = async (id: string) => {
    const toastId = toast('Begins...');
    toast.loading('Loading...', {
      description: 'Rekect Swap...',
      id: toastId,
    });

    try {
      const { status, message } = await mutateRejectRequestSwap(id);
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

  const handleCancelSwapRequest = async (id: string) => {
    const toastId = toast('Begins...');
    toast.loading('Loading...', {
      description: 'Start Operation...',
      id: toastId,
    });
    try {
      const { status, message } = await mutateCancelRequestSwap(id);
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
    create: handleCreateSwap,
    update: handleUpdateSwap,
    delete: handleCreateSwap,
    apply: handleApplyRequestSwap,
    accept: handleAcceptRequestSwap,
    reject: handleRejectRequestSwap,
    cancel: handleCancelSwapRequest,
    isLoading:
      isCreateSwapLoading ||
      isUpdateSwapLoading ||
      isAcceptRequestSwapLoading ||
      isRejectRequestSwapLoading ||
      isApplyRequestSwapLoading ||
      isCancelRequestSwapLoading,
  };

  return <SwapContext.Provider value={values}>{children}</SwapContext.Provider>;
};

export default SwapProvider;
