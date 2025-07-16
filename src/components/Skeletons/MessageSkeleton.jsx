import React from 'react';

export const MessageSkeleton = () => (
  <div className="flex items-start gap-3 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse w-full">
    <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700"></div>
    <div className="flex-1 space-y-2">
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
    </div>
  </div>
);