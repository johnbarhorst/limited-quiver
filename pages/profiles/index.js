import { useAppContext } from 'state';
import { useMutation, gql } from '@apollo/client';


const LOGOUT_USER = gql`
mutation LogoutUser {
  logoutUser 
}`;

const ProfilesHome = () => {
  const { user, setUser, setIsLoginOpen } = useAppContext();
  const [logout, { data, error, loading }] = useMutation(LOGOUT_USER);

  const handleLogout = () => {
    logout();
    setUser(null);
  }
  return (
    <main>
      <h1>
        {user ? user.username : "User Profiles"}
      </h1>
      {user ?
        <button onClick={() => handleLogout()} >Logout!</button>
        :
        <button onClick={() => setIsLoginOpen(true)} >Login</button>}
    </main>
  )
}

export default ProfilesHome;