/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { ChatroomContext } from './contexts/ChatroomContext.jsx';
import { DashboardSidebar } from './DashboardSidebar.jsx';
import { ChatroomContent } from './ChatroomContent.jsx';

export const MainLayout = () => {
  const { currentChatroom } = useContext(ChatroomContext);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
     
      <aside className="w-full md:w-64 flex-shrink-0 border-b md:border-r border-gray-200 dark:border-gray-700 flex flex-col md:flex">
        <DashboardSidebar />
      </aside>

      <main className="flex-1 flex flex-col">
        <ChatroomContent />
      </main>
    </div>
  );
};