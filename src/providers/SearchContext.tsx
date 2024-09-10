'use client';

import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';
import { toast } from 'sonner';

// eslint-disable-next-line import/no-extraneous-dependencies
import type { SearchContextType } from '@/types/search.type';

// ** Defaults
const defaultProvider: SearchContextType = {
  getSearchPaginated: (value: any) => Promise.resolve(value),
  isLoading: false,
  setIsLoading: () => Boolean,
};
const SearchContext = createContext(defaultProvider);

// Custom hook
export const useSearch = () => useContext(SearchContext);

// Create the AuthContext
const SearchProvider = ({ children }: { children: ReactNode }) => {
  // @ts-ignore
  const useHandleSearchPagination = async (url: string) => {
    try {
      return url;
    } catch (error) {
      toast.error('Error', {
        description: `${error}`,
      });
    }
  };
  const values: any = {
    getSearchPaginated: useHandleSearchPagination,
    isLoading: false,
  };

  return (
    <SearchContext.Provider value={values}>{children}</SearchContext.Provider>
  );
};

export default SearchProvider;
