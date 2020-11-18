import { createContext, useContext, useState, useEffect } from 'react';
import cookie from 'cookie';
import { useToggle } from 'hooks';


const AppContext = createContext({
  isLoginOpen: false,
  user: null
});

export const AppContextWrapper = ({ children }) => {

  const [user, setUser] = useState(null);
  const [isLoginOpen, setIsLoginOpen, toggleLogin] = useToggle(false, true);
  const [isSignUpOpen, setIsSignUpOpen, toggleSignUp] = useToggle(false, true);
  const [toasts, setToasts] = useState([]);

  // With Next, if a user navigates to a page via typing in the url, we lose our state in context.
  // Logging back in would be annoying
  // This effect is to check for our LQ_USER cookie, then refresh the user data from deserialized passport session
  useEffect(() => {
    const refreshUser = async () => {
      const data = await fetch(`/api/user`);
      if (data.status === 200) {
        const refreshedUser = await data.json();
        setUser(refreshedUser);
      }
    }
    const COOKIES = cookie.parse(document.cookie);
    if (!user && COOKIES.LQ_USER) {
      refreshUser();
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        isLoginOpen,
        setIsLoginOpen: bool => setIsLoginOpen(bool),
        toggleLogin: () => toggleLogin(),
        isSignUpOpen,
        setIsSignUpOpen: bool => setIsSignUpOpen(bool),
        toggleSignUp: () => toggleSignUp(),
        user: user,
        setUser: data => setUser(data),
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