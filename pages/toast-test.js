import { useState } from 'react';
import { useAppContext } from 'state';
import { ToastModule } from 'components';

const ToastTest = () => {
  const { toasts, addToast, removeToast } = useAppContext();
  const [count, setCount] = useState(0);

  return (
    <main>
      <ToastModule toastList={toasts} position={"BOTTOM_LEFT"} removeToast={removeToast} />
      <div>
        <button
          onClick={() => {
            addToast({ id: count, title: `Test ${count}`, message: "This is a test" });
            setCount(prev => prev + 1);
          }}
        >Add Toast</button>
      </div>
    </main>
  )
}

export default ToastTest;