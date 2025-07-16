/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import { ChatroomContext } from './contexts/ChatroomContext.jsx';
import { ThemeContext } from './contexts/ThemeContext.jsx';
import { Image, Send, Copy } from './components/Icons.jsx';
import { formatTextWithBasicMarkdown } from './utils/MarkdownFormatter.jsx';
import { MessageSkeleton } from './components/Skeletons/MessageSkeleton.jsx';
import { toast } from 'react-toastify';

export const ChatroomContent = () => {
  const { currentChatroom, setCurrentChatroom, addMessageToChatroom } = useContext(ChatroomContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [messageInput, setMessageInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [displayMessages, setDisplayMessages] = useState([]);
  const [page, setPage] = useState(1);
  const messagesPerPage = 20;
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [displayMessages, isTyping]);

  useEffect(() => {
    if (currentChatroom && currentChatroom.messages) {
      const totalMessages = currentChatroom.messages.length;
      const startIndex = Math.max(0, totalMessages - messagesPerPage * page);
      setDisplayMessages(currentChatroom.messages.slice(startIndex, totalMessages));
    }
  }, [currentChatroom, page, currentChatroom?.messages]);

  
  const handleScroll = useCallback(() => {
    if (chatContainerRef.current && chatContainerRef.current.scrollTop === 0 && !isLoadingMore && currentChatroom && currentChatroom.messages) {
      const currentTotalDisplayed = displayMessages.length;
      const totalAvailableMessages = currentChatroom.messages.length;

      if (currentTotalDisplayed < totalAvailableMessages) {
        setIsLoadingMore(true);
        setTimeout(() => {
          setPage(prevPage => prevPage + 1);
          setIsLoadingMore(false);
        }, 500); 
      }
    }
  }, [displayMessages, currentChatroom, isLoadingMore]);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.addEventListener('scroll', handleScroll);
      return () => chatContainer.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  const getSimulatedAIResponse = (userMessageText) => {
    const lowerCaseMessage = userMessageText.toLowerCase();

    if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
      return 'Hello there! How can I help you today?';
    } else if (lowerCaseMessage.includes('how are you')) {
      return 'I am an AI, so I don\'t have feelings, but I am ready to assist you!';
    } else if (lowerCaseMessage.includes('what is your name')) {
      return 'I am Gemini, a large language model, developed by Google.';
    } else if (lowerCaseMessage.includes('what can you do')) {
      return 'I can answer questions, generate text, summarize information, and much more. What would you like to try?';
    } else if (lowerCaseMessage.includes('javascript') || lowerCaseMessage.includes('js')) {
      return 'JavaScript is a programming language that enables interactive web pages. It\'s a core technology of the World Wide Web, alongside HTML and CSS.';
    } else if (lowerCaseMessage.includes('html')) {
      return 'HTML stands for HyperText Markup Language. It is the standard markup language for documents designed to be displayed in a web browser. It can be assisted by technologies like Cascading Style Sheets (CSS) and scripting languages like JavaScript.';
    } else if (lowerCaseMessage.includes('css')) {
      return 'CSS (Cascading Style Sheets) is a stylesheet language used to describe the presentation of a document written in HTML or XML (including XML dialects such as SVG, MathML or XHTML). CSS describes how elements should be rendered on screen, on paper, in speech, or on other media.';
    } else if (lowerCaseMessage.includes('react')) {
      return 'React is a free and open-source front-end JavaScript library for building user interfaces based on components. It\'s maintained by Meta and a community of individual developers and companies.';
    } else if (lowerCaseMessage.includes('python')) {
      return 'Python is a high-level, general-purpose programming language. Its design philosophy emphasizes code readability with the use of significant indentation. Python is dynamically-typed and garbage-collected. It supports multiple programming paradigms, including structured (particularly procedural), object-oriented and functional programming.';
    } else if (lowerCaseMessage.includes('java')) {
      return 'Java is a high-level, class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible. It is a general-purpose programming language intended to let application developers write once, run anywhere (WORA), meaning that compiled Java code can run on all platforms that support Java without the need for recompilation.';
    } else if (lowerCaseMessage.includes('meaning of')) {
      const term = userMessageText.replace('meaning of', '').trim();
      if (term) {
        return `The meaning of "${term}" can vary depending on context. Could you provide more details, or are you looking for a general definition?`;
      }
      return `I can try to explain the meaning of something. What specifically would you like to know?`;
    } else if (lowerCaseMessage.includes('thank you') || lowerCaseMessage.includes('thanks')) {
      return 'You\'re welcome! Is there anything else I can assist you with?';
    } else if (lowerCaseMessage.includes('goodbye') || lowerCaseMessage.includes('bye')) {
      return 'Goodbye! Have a great day!';
    } else if (lowerCaseMessage.includes('weather')) {
      return 'I cannot access real-time information like weather. I am a language model, not a weather service.';
    } else if (lowerCaseMessage.includes('time')) {
      return `I do not have a concept of current time or date. My knowledge is based on the data I was trained on.`;
    } else if (lowerCaseMessage.includes('tell me a joke')) {
      return 'Why don\'t scientists trust atoms? Because they make up everything!';
    } else if (lowerCaseMessage.includes('favorite color')) {
      return 'As an AI, I don\'t have a favorite color, but I find all colors fascinating!';
    } else if (lowerCaseMessage.includes('what is the capital of france')) {
      return 'The capital of France is Paris.';
    } else if (lowerCaseMessage.includes('who is elon musk')) {
      return 'Elon Musk is a prominent entrepreneur and business magnate. He is the CEO of SpaceX and Tesla, Inc., among other ventures.';
    } else if (lowerCaseMessage.includes('how does ai work')) {
      return 'AI works by analyzing vast amounts of data to learn patterns, make predictions, or perform tasks. Machine learning is a key part of this, where algorithms improve their performance over time without explicit programming.';
    } else if (lowerCaseMessage.includes('what is blockchain')) {
      return 'Blockchain is a decentralized, distributed ledger technology that records transactions across many computers. It\'s most famously known as the underlying technology for cryptocurrencies like Bitcoin.';
    } else if (lowerCaseMessage.includes('tell me about yourself')) {
      return 'I am a large language model, trained by Google. I am designed to assist with a wide range of tasks by processing and generating human-like text.';
    } else if (lowerCaseMessage.includes('do you have feelings')) {
      return 'No, as an AI, I do not have feelings, emotions, or consciousness. I operate based on algorithms and data.';
    } else if (lowerCaseMessage.includes('recommend a book')) {
      return 'I recommend "Sapiens: A Brief History of Humankind" by Yuval Noah Harari. It\'s a fascinating read about the history of our species.';
    } else if (lowerCaseMessage.includes('what is the internet')) {
      return 'The Internet is a global system of interconnected computer networks that uses the Internet protocol suite (TCP/IP) to communicate between networks and devices. It\'s a network of networks that consists of private, public, academic, business, and government networks of local to global scope.';
    } else if (lowerCaseMessage.includes('how to learn programming')) {
      return 'Start with the basics: choose a language like Python or JavaScript, learn fundamental concepts (variables, loops, functions), practice coding regularly, and build small projects. Online tutorials, courses, and documentation are great resources!';
    } else {
      return `You said: "${userMessageText}". I'm currently running in simulated mode and can only provide pre-defined responses. Try asking about "HTML", "JavaScript", "Python", "React", or just say "Hello"!`;
    }
  };


  const sendUserMessage = async () => {
    if (!currentChatroom) {
      toast.error('Please select a chatroom to send messages.');
      return;
    }
    if (!messageInput.trim() && !imagePreview) return;

    const newMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: messageInput.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      imageUrl: imagePreview,
    };

    setDisplayMessages(prev => [...prev, newMessage]);
    addMessageToChatroom(currentChatroom.id, newMessage);
    setMessageInput('');
    setImagePreview(null);
    toast.success('Message sent!');

    setIsTyping(true);

    setTimeout(() => {
      const aiResponseText = getSimulatedAIResponse(newMessage.text);
      const aiReply = {
        id: Date.now().toString() + '-ai',
        sender: 'ai',
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setDisplayMessages(prev => [...prev, aiReply]);
      addMessageToChatroom(currentChatroom.id, aiReply);
      setIsTyping(false);
    }, 1500);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        toast.info('Image ready to send!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCopyMessage = (text) => {
    if (!text) return;
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      textArea.remove();
      toast.success('Message copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy text: ', err);
      toast.error('Failed to copy message.');
    }
  };

  if (!currentChatroom && window.innerWidth < 768) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white p-4 text-center">
        <p className="text-xl">Select a chatroom from the top sidebar to start chatting!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 h-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
     
      <header className="flex items-center justify-between p-3 sm:p-4 bg-white dark:bg-gray-800 shadow-md">
        <h1 className="text-xl sm:text-2xl font-bold truncate max-w-[80%] sm:max-w-[90%]">{currentChatroom?.title || 'Select a Chatroom'}</h1>
        
        {currentChatroom && window.innerWidth < 768 && (
          <button
            onClick={() => setCurrentChatroom(null)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:scale-105 transition-transform"
            aria-label="Back to chatrooms"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
          </button>
        )}
      </header>

      <div
        ref={chatContainerRef}
        className="flex-1 p-3 sm:p-4 overflow-y-auto flex flex-col-reverse scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent"
        style={{ scrollBehavior: 'smooth' }}
      >
        <div ref={messagesEndRef} />
        {isTyping && (
          <div className="flex items-center gap-3 mb-4 self-start">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">AI</div>
            <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-lg max-w-xs md:max-w-md shadow-md animate-pulse">
              Gemini is typing...
            </div>
          </div>
        )}
        {displayMessages.slice().reverse().map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-3 mb-4 group ${message.sender === 'user' ? 'self-end flex-row-reverse' : 'self-start'}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${message.sender === 'user' ? 'bg-green-500' : 'bg-blue-500'}`}>
              {message.sender === 'user' ? 'You' : 'AI'}
            </div>
            <div className={`relative px-3 py-2 sm:px-4 sm:py-2 rounded-lg max-w-[80%] md:max-w-md shadow-md ${message.sender === 'user' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'}`}>
              {message.imageUrl && (
                <img
                  src={message.imageUrl}
                  alt="Uploaded"
                  className="max-w-full h-auto rounded-md mb-2 object-contain"
                  style={{ maxHeight: '200px' }}
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/150x100?text=Image+Error"; }}
                />
              )}
              {message.text && (
                <p
                  className="whitespace-pre-wrap text-sm sm:text-base"
                  dangerouslySetInnerHTML={formatTextWithBasicMarkdown(message.text)}
                />
              )}
              <span className="block text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">
                {message.timestamp}
              </span>
              <button
                onClick={() => handleCopyMessage(message.text)}
                className="absolute top-1 right-1 p-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200 focus:opacity-100"
                aria-label="Copy message to clipboard"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        {isLoadingMore && (
          <div className="flex flex-col items-center py-4">
            <MessageSkeleton />
            <MessageSkeleton />
          </div>
        )}
      </div>

      <div className="p-3 sm:p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
        <label htmlFor="image-upload" className="cursor-pointer p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:scale-105 transition-transform" aria-label="Upload image">
          <Image />
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
            disabled={!currentChatroom}
          />
        </label>
        {imagePreview && (
          <div className="relative flex-shrink-0">
            <img src={imagePreview} alt="Preview" className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-md border border-gray-300 dark:border-gray-600" />
            <button
              onClick={() => setImagePreview(null)}
              className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-500 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs font-bold"
              aria-label="Remove image preview"
            >
              X
            </button>
          </div>
        )}
        <input
          type="text"
          placeholder={currentChatroom ? "Type your message..." : "Select a chatroom to type..."} // Dynamic placeholder
          className="flex-1 px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-full shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white text-sm sm:text-base"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              sendUserMessage();
            }
          }}
          aria-label="Message input"
          disabled={!currentChatroom} 
        />
        <button
          onClick={sendUserMessage}
          className="p-2 sm:p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!messageInput.trim() && !imagePreview || !currentChatroom} 
          aria-label="Send message"
        >
          <Send />
        </button>
      </div>
    </div>
  );
};