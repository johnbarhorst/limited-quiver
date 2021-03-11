import PropTypes from 'prop-types';

export const ErrorDisplay = ({ message }) => {
  return (
    <p>{message}</p>
  );
};

ErrorDisplay.propTypes = {
  message: PropTypes.string
};