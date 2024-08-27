import React from 'react';

const TableSkeleton = () => {
  return (
    <div className="flex size-full h-full animate-pulse flex-col items-center justify-center">
      <div className="mx-auto mb-2.5 h-2.5 w-full rounded-full bg-gray-500 dark:bg-gray-700" />
      <div className="mx-auto mb-2.5 h-2.5 w-4/5 rounded-full bg-gray-400 dark:bg-gray-700" />
      <div className="mx-auto mb-2.5 h-2.5 w-3/5 rounded-full bg-gray-300 dark:bg-gray-700" />
      <div className="mx-auto mb-2.5 h-2.5 w-2/5 rounded-full bg-gray-200 dark:bg-gray-700" />
      <div className="mx-auto mb-2.5 h-2.5 w-1/5 rounded-full bg-gray-100 dark:bg-gray-700" />
      <div className="mt-4 flex items-center justify-center">
        <svg
          className="me-4 size-8 text-gray-200 dark:text-gray-700"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
        </svg>
        <div className="me-3 h-2.5 w-20 rounded-full bg-gray-200 dark:bg-gray-700" />
        <div className="h-2 w-24 rounded-full bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
  );
};

export default TableSkeleton;
