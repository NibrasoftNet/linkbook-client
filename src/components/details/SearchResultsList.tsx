'use client';

import React from 'react';

import SearchResultCard from '@/components/card/SearchResultCard';
import useSearchStore from '@/zustand/searchStore';

const SearchResultsList = () => {
  const { searchResults } = useSearchStore();
  return (
    <ul className="flex size-full flex-wrap gap-4 overflow-y-scroll p-4">
      {searchResults.map((result) => (
        <li
          key={result.id}
          className="col-span-1 flex size-full h-[400px] max-w-[300px] items-center justify-center"
        >
          <SearchResultCard details={result} />
        </li>
      ))}
    </ul>
  );
};

export default SearchResultsList;
