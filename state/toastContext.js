import { createContext, useContext, useState } from 'react';

const ToastContext = createContext({
  toasts: []
});

export const ToastContextWrapper = ({ children }) => {
  const [toastList, setToastList] = useState([]);

  return (
    <ToastContext.Provider
      value={{
        toastList,
        addToast: newToast => {
          const createdToast = {
            id: Date.now(),
            ...newToast
          }
          setToastList(prev => [createdToast, ...prev])
        },
        removeToast: id => {
          const newList = toastList.filter(toast => toast.id !== id);
          setToastList(newList);
        },
        closeAllToasts: () => setToastList([])
      }}
    >
      {children}
    </ToastContext.Provider>
  )
}

export const useToastContext = () => useContext(ToastContext);