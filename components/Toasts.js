import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { CloseButton } from 'elements';

const Toast = ({ position, title = "Toast!", message = "Message", closeToast = f => f, id }) => {
  return (
    <ToastContainer
      variants={TOAST_VARIANTS[position]}
      initial="initial"
      animate="animate"
      exit="exit"
      positionTransition
      key={id}
    >
      <CloseButton clickHandler={closeToast} />
      <div>
        <p>{title}</p>
        <p>{message}</p>
      </div>
    </ToastContainer>
  )
}


export const ToastModule = ({ position = "BOTTOM_RIGHT", toastList = [], removeToast = f => f }) => {


  return (
    <NotificationWrapper position={position}>
      <AnimatePresence>
        {toastList.map((item, i) =>
          <Toast
            position={position}
            title={item.title}
            message={item.message}
            closeToast={() => removeToast(i)}
            key={item.id}
            id={item.id}
          />
        )}
      </AnimatePresence>
    </NotificationWrapper>
  )
}

const NotificationWrapper = styled(motion.div)`
  font-size: 14px;
  position: fixed;
  display: flex;
  flex-direction: column-reverse;
  ${props => {
    switch (props.position) {
      case "CENTER":
        return "top: 20vh; left: 50vw;"

      case "TOP_RIGHT":
        return "top: 12px; right: 12px;"

      case "TOP_LEFT":
        return "top: 12px; left: 12px;"

      case "BOTTOM_LEFT":
        return "bottom: 12px; left: 12px;"

      default: return "bottom: 12px; right: 12px;"
        break;
    }
  }};
`;

const ToastContainer = styled(motion.div)`
  position: relative;
`;

const TOAST_VARIANTS = {
  TOP_RIGHT: {
    initial: {
      x: 100,
      opacity: 0
    },
    animate: {
      x: 0,
      opacity: 1
    },
    exit: {
      x: 100,
      opacity: 0,
      scale: .5
    }
  },
  BOTTOM_RIGHT: {
    initial: {
      x: 100,
      opacity: 0
    },
    animate: {
      x: 0,
      opacity: 1
    },
    exit: {
      x: 100,
      opacity: 0,
      scale: .5
    }
  },
  TOP_LEFT: {
    initial: {
      x: -100,
      opacity: 0
    },
    animate: {
      x: 0,
      opacity: 1
    },
    exit: {
      x: -100,
      opacity: 0,
      scale: .5
    }
  },
  BOTTOM_LEFT: {
    initial: {
      x: -100,
      opacity: 0
    },
    animate: {
      x: 0,
      opacity: 1
    },
    exit: {
      x: -100,
      opacity: 0,
      scale: .5
    }
  },
  CENTER: {
    initial: {
      y: 100,
      opacity: 0
    },
    animate: {
      y: 0,
      opacity: 1
    },
    exit: {
      opacity: 0,
      scale: .5
    }
  }
}