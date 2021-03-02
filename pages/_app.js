import PropTypes from 'prop-types';
import NProgress from 'nprogress';
import Router from 'next/router';
import { ThemeProvider } from 'styled-components';
import theme from 'styles/theme';
import { ToastContextWrapper } from 'state';
import 'styles/normalize.css';
import 'styles/globals.css';
import 'styles/style.css';
import 'styles/nprogress.css';

// Loading indicator on page transitions
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());



const MyApp = ({ Component, pageProps }) => {
	return (
		<ThemeProvider theme={theme}>
			<ToastContextWrapper>
				<Component {...pageProps} />
			</ToastContextWrapper>
		</ThemeProvider>
	);
};

export default MyApp;

MyApp.propTypes = {
	Component: PropTypes.elementType,
	pageProps: PropTypes.any
};