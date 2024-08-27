// eslint-disable-next-line import/no-extraneous-dependencies
import { create } from 'zustand';
// eslint-disable-next-line import/no-extraneous-dependencies
import { devtools, persist } from 'zustand/middleware';

interface SearchProps {
  type: string;
  category: number;
  city: string;
  setType: (type: string) => void;
  setCategory: (category: number) => void;
  setCity: (city: string) => void;
}

const useSearchStore = create<SearchProps>()(
  devtools(
    persist(
      (set) => ({
        type: '',
        category: 0,
        city: '',
        setType: (type: string) => set({ type }),
        setCategory: (category: number) => set({ category }),
        setCity: (city: string) => set({ city }),
      }),
      { name: 'searchStore' },
    ),
  ),
);

export default useSearchStore;
