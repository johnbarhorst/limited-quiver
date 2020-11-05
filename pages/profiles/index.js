import { useAppContext } from 'state';


const ProfilesHome = () => {
  const { user, setUser, setIsLoginOpen, setIsSignUpOpen } = useAppContext();

  const handleLogout = async () => {
    await fetch('/api/auth', {
      method: 'DELETE',
    });
    setUser(null);
  }
  return (
    <main>
      <h1>
        {user ? user.username : "User Profiles"}
      </h1>
      <div>
        {user ?
          <button onClick={() => handleLogout()} >Logout!</button>
          :
          <>
            <button onClick={() => setIsLoginOpen(true)} >Login</button>
            <button onClick={() => setIsSignUpOpen(true)}>Sign Up</button>
          </>
        }
      </div>
    </main>
  )
}

export default ProfilesHome;