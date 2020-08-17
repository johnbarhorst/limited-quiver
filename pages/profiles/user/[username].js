import { useRouter } from 'next/router';
import { useGetUser } from 'hooks';


const UserProfile = () => {
  const { username } = useRouter().query;
  const { user, isLoading, isError } = useGetUser(username);

  if (isLoading) return (
    <div>
      <h1>Loading...</h1>
    </div>
  )

  if (isError) return (
    <div>
      <h1>Error!</h1>
    </div>
  )

  // TODO: Make better
  if (!user.success) return (
    <div>
      <h1>{user.message}</h1>
    </div>
  )
  return (
    <div>
      <h1>{user.data.username}</h1>

    </div>
  )
}

export default UserProfile;