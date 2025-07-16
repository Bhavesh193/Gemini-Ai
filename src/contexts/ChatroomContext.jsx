import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from './AuthContext.jsx';

export const ChatroomContext = createContext();

export const ChatroomProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [chatrooms, setChatrooms] = useState([]);
  const [currentChatroom, setCurrentChatroom] = useState(null);
  const [loadingChatrooms, setLoadingChatrooms] = useState(true);

  useEffect(() => {
    console.log('ChatroomContext: useEffect for loading chatrooms triggered. User:', user);
    if (user && user.phoneNumber) {
      setLoadingChatrooms(true);
      const userChatroomsKey = `chatrooms_${user.phoneNumber}`;
      try {
        const storedChatrooms = localStorage.getItem(userChatroomsKey);
        const loadedChatrooms = storedChatrooms ? JSON.parse(storedChatrooms) : [];
        loadedChatrooms.sort((a, b) => a.title.localeCompare(b.title));
        setChatrooms(loadedChatrooms);
        console.log('ChatroomContext: Loaded chatrooms for user:', user.phoneNumber, loadedChatrooms);

       
        if (currentChatroom && loadedChatrooms.some(room => room.id === currentChatroom.id)) {
          setCurrentChatroom(loadedChatrooms.find(room => room.id === currentChatroom.id));
          console.log('ChatroomContext: Re-selected current chatroom.');
        } else {
          setCurrentChatroom(null); 
          console.log('ChatroomContext: Cleared current chatroom (no valid chatrooms).');
        }

      } catch (error) {
        console.error("ChatroomContext: Failed to load chatrooms from localStorage:", error);
        toast.error('Failed to load your chat history.');
        setChatrooms([]);
        setCurrentChatroom(null);
      } finally {
        setLoadingChatrooms(false);
      }
    } else {
      console.log('ChatroomContext: No valid user, clearing chatrooms state.');
      setChatrooms([]);
      setCurrentChatroom(null);
      setLoadingChatrooms(false);
    }
  }, [user?.phoneNumber]);

  useEffect(() => {
    if (user && user.phoneNumber) {
      const userChatroomsKey = `chatrooms_${user.phoneNumber}`;
      localStorage.setItem(userChatroomsKey, JSON.stringify(chatrooms));
      console.log('ChatroomContext: Saved chatrooms to localStorage for user:', user.phoneNumber, chatrooms);
    } else {
      console.log('ChatroomContext: No user to save chatrooms for.');
    }
  }, [chatrooms, user?.phoneNumber]);

  const addChatroom = (title) => {
    if (!user || !user.phoneNumber) {
      toast.error('Please log in to create a chatroom.');
      return;
    }
    const newChatroom = {
      id: Date.now().toString(),
      title,
      messages: [],
    };
    setChatrooms((prev) => [...prev, newChatroom]);
    toast.success('Chatroom created!');
    console.log('ChatroomContext: Added new chatroom:', newChatroom.title);
  };

  const deleteChatroom = (id) => {
    setChatrooms((prev) => {
      const updatedChatrooms = prev.filter((room) => room.id !== id);
      if (currentChatroom && currentChatroom.id === id) {
        setCurrentChatroom(null);
      }
      toast.info('Chatroom deleted!');
      console.log('ChatroomContext: Deleted chatroom with ID:', id);
      return updatedChatrooms;
    });
  };

  const addMessageToChatroom = (chatroomId, message) => {
    if (!user || !user.phoneNumber) {
      toast.error('Please log in to send messages.');
      return;
    }
    setChatrooms((prevChatrooms) => {
      const updatedChatrooms = prevChatrooms.map((room) =>
        room.id === chatroomId
          ? { ...room, messages: [...room.messages, message] }
          : room
      );
      console.log('ChatroomContext: Added message to chatroom:', chatroomId, message);
      return updatedChatrooms;
    });
  };

  useEffect(() => {
    if (currentChatroom) {
      const foundRoom = chatrooms.find(room => room.id === currentChatroom.id);
      if (foundRoom && foundRoom !== currentChatroom) {
        setCurrentChatroom(foundRoom);
        console.log('ChatroomContext: Updated currentChatroom reference.');
      } else if (!foundRoom) {
        setCurrentChatroom(null);
        console.log('ChatroomContext: Current chatroom no longer exists, setting to null.');
      }
    }
  }, [chatrooms]);

  return (
    <ChatroomContext.Provider
      value={{
        chatrooms,
        addChatroom,
        deleteChatroom,
        currentChatroom,
        setCurrentChatroom,
        addMessageToChatroom,
        loadingChatrooms,
      }}
    >
      {children}
    </ChatroomContext.Provider>
  );
};