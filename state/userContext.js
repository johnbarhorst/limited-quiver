import { createContext, useContext, useState } from 'react';

const UserContext = createContext({
  isLoggedIn: false,
  user: null
});

export const UserContextWrapper = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <UserContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        user: user,
        setUserContext: data => setUser(data),
        setIsLoggedIn: bool => setIsLoggedIn(bool)
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext);