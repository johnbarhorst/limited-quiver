import PropTypes from 'prop-types';
import { LogoutButton } from 'components/Utilities';
import { Layout } from 'components/Layout';

export function LoggedInUserPage({ user }) {
  return (
    <Layout title={user.username}>
      <h3>{user.username}</h3>
      <div>
        <LogoutButton />
      </div>
    </Layout>
  );
}

LoggedInUserPage.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string
  })
};


