import React from 'react';

export const ChatroomListSkeleton = () => (
  <div className="flex flex-col gap-2 p-4">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse">
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-8 w-8 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
      </div>
    ))}
  </div>
);