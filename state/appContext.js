import { createContext, useContext, useState, useEffect } from 'react';
import cookie from 'cookie';
import { useToggle } from 'hooks';


const AppContext = createContext({
  isLoginOpen: false,
  user: null
});

export const AppContextWrapper = ({ children }) => {
  const [isLoginOpen, setIsLoginOpen, toggleLogin] = useToggle(false, true);
  const [isSignUpOpen, setIsSignUpOpen, toggleSignUp] = useToggle(false, true);
  const [toasts, setToasts] = useState([]);

  return (
    <AppContext.Provider
      value={{
        isLoginOpen,
        setIsLoginOpen: bool => setIsLoginOpen(bool),
        toggleLogin: () => toggleLogin(),
        isSignUpOpen,
        setIsSignUpOpen: bool => setIsSignUpOpen(bool),
        toggleSignUp: () => toggleSignUp(),
        toasts,
        addToast: newToast => {
          const createdToast = {
            id: Date.now(),
            ...newToast
          }
          setToasts([createdToast, ...toasts])
        },
        removeToast: id => {
          const newList = toasts.filter(toast => toast.id !== id);
          setToasts(newList);
        },
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext);