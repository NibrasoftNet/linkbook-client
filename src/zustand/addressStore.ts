import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import type { CreateAddressProps } from '@/types/address.type';

interface AddressStore {
  position: { lat: number; lng: number } | null;
  address: CreateAddressProps | null;
  setPosition: (position: { lat: number; lng: number } | null) => void;
  setAddress: (address: CreateAddressProps | null) => void;
}

const useAddressStore = create<AddressStore>()(
  devtools((set) => ({
    position: null,
    address: null,
    setPosition: (position) => set({ position }),
    setAddress: (address) => set({ address }),
  })),
);

export default useAddressStore;
