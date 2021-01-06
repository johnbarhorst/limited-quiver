import { useUser } from 'hooks';
import { Login, SignUpModal } from 'components';


const ProfilesHome = () => {
  const { user, userIsLoading, userIsError, mutate } = useUser();

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
            <SignUpModal />
          </>
        }
      </div>
    </main>
  )
}

export default ProfilesHome;