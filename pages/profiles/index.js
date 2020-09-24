import { useAppContext } from 'state';
import { useMutation, gql } from '@apollo/client';


const LOGOUT_USER = gql`
mutation LogoutUser {
  logoutUser 
}`;

const ProfilesHome = () => {
  const { user, setUser } = useAppContext();
  const [logout, { data, error, loading }] = useMutation(LOGOUT_USER);

  const handleLogout = () => {
    logout();
    setUser(null);
  }
  return (
    <div>
      <h1>
        {user ? user.username : "User Profiles"}
      </h1>
      <button onClick={() => handleLogout()} >Logout!</button>
    </div>
  )
}

export default ProfilesHome;