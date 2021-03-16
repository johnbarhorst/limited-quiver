import { Layout } from 'components/Layout';
import { Login, SignUp } from './Modals';

export function LoggedOutUserPage() {
  return (
    <Layout>
      <h3>Log in or Sign Up!</h3>
      <Login>Log In</Login><SignUp>Sign Up</SignUp>
    </Layout>
  );
}