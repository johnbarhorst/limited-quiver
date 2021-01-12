import { useToastContext } from 'state';

export const CreateToast = () => {
  const { addToast } = useToastContext();
  const createTestToast = () => {
    addToast({
      title: "Testing Toast",
      message: "Toast has been tested."
    })
  }
  return (
    <button onClick={() => createTestToast()} >Toasty!</button>
  );
}