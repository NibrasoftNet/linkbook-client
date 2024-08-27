'use client';

import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { toast } from 'sonner';

import {
  useCreateDonationMutation,
  useUpdateDonationMutation,
} from '@/tanstack/donations.query';
import type { DonationsContextType } from '@/types/donation.type';
import type { DonationSchemaFormType } from '@/validations/create-donation-schema.validator';

// ** Defaults
const defaultProvider: DonationsContextType = {
  create: (value: any) => Promise.resolve(value),
  update: (value: any) => Promise.resolve(value),
  delete: (value: any) => Promise.resolve(value),
  isLoading: false,
  setIsLoading: () => Boolean,
};
const DonationContext = createContext(defaultProvider);

// Custom hook
export const useDonation = () => useContext(DonationContext);

// Create the AuthContext
const DonationProvider = ({ children }: { children: ReactNode }) => {
  const {
    mutateAsync: mutateCreateDonation,
    isLoading: isCreateDonationLoading,
  } = useCreateDonationMutation();

  const {
    mutateAsync: mutateUpdateDonation,
    isLoading: isUpdateDonationLoading,
  } = useUpdateDonationMutation();

  const handleCreateDonation = async (donationData: DonationSchemaFormType) => {
    const formData = new FormData();
    if (donationData.files) {
      donationData.files.forEach((file) => {
        formData.append('files', file);
      });
    }
    formData.append(
      'data',
      JSON.stringify({
        description: donationData.description,
        quantity: donationData.quantity,
        product: donationData.product,
        address: donationData.address,
      }),
    );
    const toastId = toast('Begins...');
    toast.loading('Loading...', {
      description: 'Create Donation...',
      id: toastId,
    });

    try {
      const { status, message } = await mutateCreateDonation(formData);
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
  const handleUpdateDonation = async (
    id: number,
    donationData: Partial<DonationSchemaFormType>,
  ) => {
    const toastId = toast('Begins...');
    toast.loading('Loading...', {
      description: 'Create Donation...',
      id: toastId,
    });

    const formData = new FormData();
    formData.append(
      'data',
      JSON.stringify({
        description: donationData.description,
        quantity: donationData.quantity,
        product: donationData.product,
        address: donationData.address,
      }),
    );

    try {
      const { status, message } = await mutateUpdateDonation({ id, formData });
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
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const values: any = {
    create: handleCreateDonation,
    update: handleUpdateDonation,
    delete: handleCreateDonation,
    isLoading: isCreateDonationLoading || isUpdateDonationLoading,
  };

  return (
    <DonationContext.Provider value={values}>
      {children}
    </DonationContext.Provider>
  );
};

export default DonationProvider;
