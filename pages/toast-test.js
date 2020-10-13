import { useAppContext } from 'state';
import { ToastModule } from 'components';

const ToastTest = () => {
  const { toasts, addToast } = useAppContext();

  return (
    <main>
      <ToastModule toastList={toasts} />
      <div>
        <button
          onClick={() => addToast({ title: "TEST!", message: "This is a test" })}
        >Add Toast</button>
      </div>
    </main>
  )
}

export default ToastTest;