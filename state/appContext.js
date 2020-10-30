import { createContext, useContext, useState, useEffect } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import cookie from 'cookie';
import { useToggle } from 'hooks';

const REFRESH_USER = gql`
  query getUser($id: ID) {
    userById(id: $id) {
      id
      username
      name {
        first
        last
      }
      fullname
      events {
        id
        name
        admin {
          id
          username
        }
        participants {
          id
          username
        }
        active
        private
        rounds
        shotsPer
        scores
        participantCap
        startDate
        endDate
      }
    } 
  }
`;

const AppContext = createContext({
  isLoginOpen: false,
  user: null
});

export const AppContextWrapper = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoginOpen, setIsLoginOpen, toggleLogin] = useToggle(false, true);
  const [isSignUpOpen, setIsSignUpOpen, toggleSignUp] = useToggle(false, true);
  const [toasts, setToasts] = useState([]);
  const [getUser, { data, loading: userLoading, error: userLoadError }] = useLazyQuery(REFRESH_USER, {
    onError: err => console.log(err),
    onCompleted: () => setUser(data.userById)
  });
  useEffect(() => {
    const COOKIES = cookie.parse(document.cookie);
    if (!user && COOKIES.LQ_USER) {
      getUser({ variables: { id: COOKIES.LQ_USER } });

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
        userLoading,
        userLoadError,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext);