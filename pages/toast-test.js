import { useState } from 'react';
import { useAppContext } from 'state';

const ToastTest = () => {
  const { addToast } = useAppContext();
  const [count, setCount] = useState(0);

  return (
    <main>
      <div>
        <button
          onClick={() => {
            addToast({ title: `Test ${count}`, message: "This is a test" });
            setCount(prev => prev + 1);
          }}
        >Add Toast</button>
      </div>
    </main>
  )
}

export default ToastTest;