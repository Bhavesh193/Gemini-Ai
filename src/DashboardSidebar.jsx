/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { ChatroomContext } from './contexts/ChatroomContext.jsx';
import { AuthContext } from './contexts/AuthContext.jsx';
import { ThemeContext } from './contexts/ThemeContext.jsx';
import { CreateChatroomSchema } from './schemas/ValidationSchemas.jsx';
import { Plus, Trash, Search, LogOut, UserX, Sun, Moon } from './components/Icons.jsx';
import { ChatroomListSkeleton } from './components/Skeletons/ChatroomListSkeleton.jsx';
import { CreateChatroomModal } from './components/Modals/CreateChatroomModal.jsx';
import { ConfirmDeleteModal } from './components/Modals/ConfirmDeleteModal.jsx';

export const DashboardSidebar = () => {
  const { chatrooms, addChatroom, deleteChatroom, setCurrentChatroom, loadingChatrooms, currentChatroom } = useContext(ChatroomContext); 
  const { user, logout, deleteAccountAndData } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(CreateChatroomSchema),
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const onCreateChatroom = (data) => {
    addChatroom(data.title);
    setIsModalOpen(false);
    reset();
  };

  const handleDeleteAccount = () => {
    setIsConfirmDeleteModalOpen(true);
  };

  const confirmDeleteAccount = () => {
    deleteAccountAndData();
    setIsConfirmDeleteModalOpen(false);
  };

  const filteredChatrooms = chatrooms.filter(room =>
    room.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  if (currentChatroom && window.innerWidth < 768) { 
    return null;
  }

  return (
    <div className="flex flex-col h-full p-4 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto w-full"> 
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Chatrooms</h2>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:scale-105 transition-transform"
          aria-label="Toggle dark mode"
        >
          {theme === 'light' ? <Moon /> : <Sun />}
        </button>
      </div>

      {user && user.phoneNumber && (
        <div className="mb-4 text-sm text-gray-600 dark:text-gray-300 break-all">
          Logged in as: <span className="font-semibold">{user.phoneNumber}</span>
        </div>
      )}

      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full flex items-center justify-center py-2 px-4 mb-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
        aria-label="Create new chatroom"
      >
        <Plus className="mr-2" /> New Chat
      </button>

      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search chatrooms..."
          className="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search chatrooms"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 -mr-2 scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
        {loadingChatrooms ? (
          <ChatroomListSkeleton />
        ) : (
          filteredChatrooms.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
              No chatrooms found. Create one to start!
            </p>
          ) : (
            filteredChatrooms.map((room) => (
              <div
                key={room.id}
                className="flex items-center justify-between p-3 mb-2 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                <button
                  onClick={() => setCurrentChatroom(room)}
                  className="flex-1 text-left text-base font-medium text-blue-600 dark:text-blue-400 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-1 -ml-1 truncate"
                  aria-label={`Open chatroom ${room.title}`}
                >
                  {room.title}
                </button>
                <button
                  onClick={() => deleteChatroom(room.id)}
                  className="p-1 rounded-full text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-700 transition-colors duration-200"
                  aria-label={`Delete chatroom ${room.title}`}
                >
                  <Trash className="w-5 h-5" />
                </button>
              </div>
            ))
          )
        )}
      </div>

      <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-col space-y-2">
        <button
          onClick={logout}
          className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-red-600 dark:text-red-100 bg-red-100 dark:bg-red-700 hover:bg-red-200 dark:hover:bg-red-600 transition-colors duration-200"
          aria-label="Logout"
        >
          <LogOut className="mr-2" /> Logout
        </button>
        <button
          onClick={handleDeleteAccount}
          className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
          aria-label="Delete account and all data"
          title="Delete Account and all Chat Data"
        >
          <UserX className="mr-2" /> Delete Account & Data
        </button>
      </div>

      {isModalOpen && (
        <CreateChatroomModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreate={onCreateChatroom}
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
        />
      )}

      {isConfirmDeleteModalOpen && (
        <ConfirmDeleteModal
          isOpen={isConfirmDeleteModalOpen}
          onClose={() => setIsConfirmDeleteModalOpen(false)}
          onConfirm={confirmDeleteAccount}
        />
      )}
    </div>
  );
};