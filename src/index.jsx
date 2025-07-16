// import React, { useEffect } from 'react';
// import { App } from './App.jsx';
// import { ThemeProvider } from './contexts/ThemeContext.jsx';
// import { AuthProvider } from './contexts/AuthContext.jsx';
// import { ChatroomProvider } from './contexts/ChatroomContext.jsx';

// const Root = () => {
  
//   useEffect(() => {
//     const link = document.createElement('link');
//     link.href = 'https://cdnjs.cloudflare.com/ajax/libs/react-toastify/9.1.1/ReactToastify.min.css';
//     link.rel = 'stylesheet';
//     document.head.appendChild(link);

//     return () => {
//       document.head.removeChild(link);
//     };
//   }, []);

//   return (
//     <ThemeProvider>
//       <AuthProvider>
//         <ChatroomProvider>
//           <App />
//         </ChatroomProvider>
//       </AuthProvider>
//     </ThemeProvider>
//   );
// };

// export default Root;






import React, { useEffect } from 'react';
import { App } from './App.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { ChatroomProvider } from './contexts/ChatroomContext.jsx';

const Root = () => {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/react-toastify/9.1.1/ReactToastify.min.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <ChatroomProvider>
          <App />
        </ChatroomProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default Root;