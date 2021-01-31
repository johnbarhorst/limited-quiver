import { createContext, useContext, useState, useEffect } from 'react';

const ViewportContext = createContext({});

export const ViewportContextWrapper = ({ children }) => {
  const [windowHeight, setWindowHeight] = useState();
  const [windowWidth, setWindowWidth] = useState();

  const handleResize = () => {
    setWindowHeight(window.innerHeight);
    setWindowWidth(window.innerWidth);
  }

  // set initial values after we're sure it's in a browser, not ssr/ssg
  useEffect(() => {
    handleResize();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [])

  return (
    <ViewportContext.Provider
      value={{
        windowHeight,
        windowWidth
      }}
    >
      {children}
    </ViewportContext.Provider>
  )
}

export const useViewport = () => useContext(ViewportContext);