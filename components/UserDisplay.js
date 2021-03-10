import PropTypes from 'prop-types';

export const UserDisplay = ({ user }) => {
  return (
    <div>
      <h3>{user.username}</h3>
    </div>
  );
};

UserDisplay.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string
  })
};