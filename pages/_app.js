import { ThemeProvider } from 'styled-components';
import theme from 'styles/theme';
import { ToastContextWrapper } from 'state';
import 'styles/normalize.css';
import 'styles/globals.css';



const MyApp = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <ToastContextWrapper>
        <Component {...pageProps} />
      </ToastContextWrapper>
    </ThemeProvider>
  )
}

export default MyApp;
