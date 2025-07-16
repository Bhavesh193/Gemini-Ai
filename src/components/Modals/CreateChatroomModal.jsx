import React from 'react';

export const CreateChatroomModal = ({ isOpen, onClose, onCreate, register, handleSubmit, errors }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Create New Chatroom</h3>
        <form onSubmit={handleSubmit(onCreate)} className="space-y-4">
          <div>
            <label htmlFor="chatroomTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Chatroom Title
            </label>
            <input
              type="text"
              id="chatroomTitle"
              {...register('title')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="e.g., My AI Assistant"
              aria-invalid={errors.title ? "true" : "false"}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              aria-label="Cancel chatroom creation"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              aria-label="Create chatroom"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};