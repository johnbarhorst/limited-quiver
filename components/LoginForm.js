import { useAppContext } from 'state';
import { gql, useMutation } from '@apollo/client';
import { ErrorDisplay } from 'components';
import { Form, TextInput, Button } from 'elements';
import { useInput } from 'hooks';

const LOGIN_USER = gql`
mutation LoginUser($credentials: CredentialsInput) {
  loginUser(credentials: $credentials) {
    id
    username
    name {
      first
      last
    }
    events {
      id 
    }
  }
}
`;

export const LoginForm = () => {
  const { setIsLoginOpen, setUser } = useAppContext();
  const [email, resetEmail] = useInput('');
  const [password, resetPassword] = useInput('');
  const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER,
    {
      onError: err => console.log(err),
      onCompleted: data => {
        setUser(data.loginUser);
        resetEmail();
        resetPassword();
        setIsLoginOpen(false);
      }
    });


  const handleSubmit = async e => {
    e.preventDefault();
    const credentials = {
      email: email.value,
      password: password.value
    }

    loginUser({
      variables: { credentials },
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <TextInput type="email" placeholder="myEmail@dontspammebro.net" name="email" {...email} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <TextInput type="password" name="password" {...password} />
      </div>
      <div>
        <Button type="submit">{loading ? 'Signing In' : 'Sign in'}</Button>
      </div>
      <div>
        {error && <ErrorDisplay message={error.message} />}
      </div>
    </Form>
  )
}