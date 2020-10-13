import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { CloseButton } from 'elements';

const TOAST_VARIANTS = {
  TOP_RIGHT: {
    initial: {
      top: 12,
      right: -100
    },
    animate: {
      top: 12,
      right: 12
    },

  }
}

const Toast = ({ position, title = "Toast!", message = "Message", closeToast = f => f }) => {
  return (
    <ToastContainer
      initial={TOAST_VARIANTS[position].initial}
      animate={TOAST_VARIANTS[position].animate}
    >
      <CloseButton clickHandler={closeToast} />
      <div>
        <p>{title}</p>
        <p>{message}</p>
      </div>
    </ToastContainer>
  )
}


export const ToastModule = ({ position = "TOP_RIGHT", toastList = [] }) => {
  const [list, setList] = useState(toastList);

  useEffect(() => {
    setList(toastList);
  }, [list, toastList]);


  return (
    <NotificationWrapper left>
      <AnimatePresence>
        {list.map((item, i) => <Toast position={position} title={item.title} message={item.message} />)}
      </AnimatePresence>
    </NotificationWrapper>
  )
}

const NotificationWrapper = styled(motion.div)`
  font-size: 14px;
  position: fixed;
  ${props => props.top ? 'top: 12px;' : 'bottom: 12px;'};
  ${props => props.left ? 'left: 12px;' : 'right: 12px;'};
`;

const ToastContainer = styled(motion.div)`
  position: relative;
`;