import { Button } from 'elements';
import { useUser } from 'hooks';


export const LogoutButton = () => {
  const { mutate } = useUser();

  const handleLogout = async () => {
    await fetch('/api/auth', {
      method: 'DELETE',
    });
    mutate(null);
  };

  return (
    <Button onClick={() => handleLogout()}>Logout</Button>
  );
};