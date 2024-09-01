// eslint-disable-next-line import/no-extraneous-dependencies
import { create } from 'zustand';
// eslint-disable-next-line import/no-extraneous-dependencies
import { devtools, persist } from 'zustand/middleware';

import type { SearchServiceProps } from '@/types/search.type';
import { SearchTypeEnum } from '@/types/types';

interface SearchProps {
  type: SearchTypeEnum;
  category: number;
  city: string;
  searchResults: SearchServiceProps[];
  setType: (type: SearchTypeEnum) => void;
  setCategory: (category: number) => void;
  setCity: (city: string) => void;
  setSearchResults: (results: SearchServiceProps[]) => void;
}

const useSearchStore = create<SearchProps>()(
  devtools(
    persist(
      (set) => ({
        type: SearchTypeEnum.DONATIONS,
        category: 0,
        city: '',
        searchResults: [],
        setType: (type: SearchTypeEnum) => set({ type }),
        setCategory: (category: number) => set({ category }),
        setCity: (city: string) => set({ city }),
        setSearchResults: (results: SearchServiceProps[]) =>
          set({ searchResults: results }),
      }),
      { name: 'searchStore' },
    ),
  ),
);

export default useSearchStore;
