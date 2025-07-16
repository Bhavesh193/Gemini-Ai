import { useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import { AuthScreen } from './AuthScreen.jsx';
import { MainLayout } from './MainLayout.jsx';
import { AuthContext } from './contexts/AuthContext.jsx';

export const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="font-inter antialiased">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {!user ? (
        <AuthScreen />
      ) : (
        <MainLayout />
      )}
    </div>
  );
};