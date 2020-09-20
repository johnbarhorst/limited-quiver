import { useAppContext } from 'state';

const ProfilesHome = () => {
  const { user } = useAppContext()
  return (
    <div>
      <h1>
        {user ? user.username : "User Profiles"}
      </h1>
    </div>
  )
}

export default ProfilesHome;