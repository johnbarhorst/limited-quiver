import { useAppContext } from 'state';
import { Form, TextInput, Button } from 'elements';
import { useInput } from 'hooks';


export const LoginForm = () => {
  const [email, resetEmail] = useInput('');
  const [password, resetPassword] = useInput('');
  const { setIsLoginOpen, setUser } = useAppContext();

  const handleSubmit = async e => {
    e.preventDefault();
    const credentials = {
      email: email.value,
      password: password.value
    }
    const mutation = `mutation LoginUser($credentials: CredentialsInput) {
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

    const request = await fetch('/api/graphql', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      // Pass mutation string along with user
      body: JSON.stringify({
        query: mutation,
        variables: {
          credentials
        }
      })
    });
    const response = await request.json();
    if (response.data) {
      setUser(response.data.loginUser);
      resetEmail();
      resetPassword();
      setIsLoginOpen(false);
    }
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
        <Button type="submit">Log In</Button>
      </div>
    </Form>
  )
}