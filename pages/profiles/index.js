import nextConnect from 'next-connect';
import middleware from 'middleware/middleware';
import { useUser } from 'hooks';
import { Layout, Login, SignUp, LogoutButton } from 'components';


const ProfilesHome = (props) => {
  const { user, userIsLoading, userIsError, mutate } = useUser(props.user);

  return (
    <Layout>
      <h1>
        {user ? user.username : "User Profiles"}
      </h1>
      <div>
        {user ?
          <LogoutButton />
          :
          <>
            <Login />
            <SignUp />
          </>
        }
      </div>
    </Layout>
  )
}

export default ProfilesHome;

export async function getServerSideProps({ req, res }) {
  // tap into the middleware
  const handler = nextConnect();
  handler.use(middleware);
  try {
    await handler.run(req, res);
  } catch (error) {
    // TODO Handle errors
    console.log(error)
  }
  if (!req.user) {
    return {
      props: {
        user: null
      }
    }
  }
  return {
    props: {
      user: JSON.parse(JSON.stringify(req.user))
    }
  }
}