import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useToastContext } from 'state';
import { CloseButton } from 'elements';

const Toast = ({ title = "Toast!", message = "Message", closeToast = f => f, id }) => {
  return (
    <ToastContainer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      layout
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


export const ToastModule = ({ position = "BOTTOM_RIGHT" }) => {
  const { toastList, removeToast, closeAllToasts } = useToastContext();
  return (
    <NotificationWrapper position={position}>
      <AnimatePresence>
        {toastList.map((item, i) =>
          <Toast
            title={item.title}
            message={item.message}
            closeToast={() => removeToast(item.id)}
            key={item.id}
            id={item.id}
          />
        )}
        {toastList.length > 1 &&
          <ClearToastsButton
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            onClick={() => closeAllToasts()}
          >Clear All
         </ClearToastsButton>}
      </AnimatePresence>
    </NotificationWrapper>
  )
}

const NotificationWrapper = styled(motion.ul)`
  font-size: 14px;
  position: fixed;
  display: flex;
  flex-direction: column-reverse;
  list-style: none;
  padding: 0;
  z-index: 1001;
  ${props => {
    switch (props.position) {
      case "CENTER":
        return "top: 20vh; left: 50vw;"

      case "TOP_RIGHT":
        return "top: 12px; right: 12px;"

      case "TOP_LEFT":
        return "top: 12px; left: 12px;"

      case "BOTTOM_LEFT":
        return "bottom: 50px; left: 12px;"

      default: return "bottom: 50px; right: 12px;"
        break;
    }
  }};
`;

const ToastContainer = styled(motion.li)`
  position: relative;
`;

const ClearToastsButton = styled(motion.button)`
  order: -1;
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