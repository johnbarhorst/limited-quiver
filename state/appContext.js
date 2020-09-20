import { createContext, useContext, useState } from 'react';
import { useToggle } from 'hooks';

const AppContext = createContext({
  isLoginOpen: false,
  user: null
});

export const AppContextWrapper = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoginOpen, setIsLoginOpen, toggleLogin] = useToggle(false, true);
  return (
    <AppContext.Provider
      value={{
        isLoginOpen,
        user: user,
        setUser: data => setUser(data),
        toggleLogin: () => toggleLogin(),
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext);