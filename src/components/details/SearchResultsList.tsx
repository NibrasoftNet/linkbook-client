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
          className="flex h-[360px] w-full items-center justify-center md:w-[250px]"
        >
          <SearchResultCard details={result} />
        </li>
      ))}
    </ul>
  );
};

export default SearchResultsList;
