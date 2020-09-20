import { useUserContext } from 'state';

const ProfilesHome = () => {
  const { user } = useUserContext()
  return (
    <div>
      <h1>
        {user ? user.username : "User Profiles"}
      </h1>
    </div>
  )
}

export default ProfilesHome;