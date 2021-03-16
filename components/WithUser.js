import PropTypes from 'prop-types';
import { useUser } from 'hooks';
import { Login } from './Modals';

export const WithUser = ({ render }) => {
  const { user, userIsLoading } = useUser();
  if(userIsLoading) return <h3>Loading User Data...</h3>;
  if(!user) return (
    <>
      <h3>You must log in to see this content.</h3>
      <Login />
    </>
  );

  return (
    <>
      {render(user)}
    </>
  );
};


WithUser.propTypes = {
  render: PropTypes.func
};