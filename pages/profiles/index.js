import { useAppContext } from 'state';
import { useUser } from 'hooks';
import { Login } from 'components';


const ProfilesHome = () => {
  const { user, userIsLoading, userIsError, mutate } = useUser();
  const { setIsSignUpOpen } = useAppContext();

  const handleLogout = async () => {
    await fetch('/api/auth', {
      method: 'DELETE',
    });
    mutate(null);
  }
  return (
    <main>
      <h1>
        {user ? user.username : "User Profiles"}
      </h1>
      <div>
        {user ?
          <button onClick={() => handleLogout()} >Logout</button>
          :
          <>
            <Login />
            <button onClick={() => setIsSignUpOpen(true)}>Sign Up</button>
          </>
        }
      </div>
    </main>
  )
}

export default ProfilesHome;