import PropTypes from 'prop-types';
import { MdClear } from 'react-icons/md';
import { CloseButtonStyle } from './styles/Buttons';

export const CloseButton = ({ clickHandler = f => f }) => {
  return (
    <CloseButtonStyle onClick={clickHandler} >
      <MdClear />
    </CloseButtonStyle>
  );
};

CloseButton.propTypes = {
  clickHandler: PropTypes.func
};