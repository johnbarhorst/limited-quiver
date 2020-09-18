
import { Form, TextInput, Button } from 'elements';
import { useInput } from 'hooks';


const Login = () => {
  const [email, resetEmail] = useInput('');
  const [password, resetPassword] = useInput('');

  const handleSubmit = async e => {
    e.preventDefault();
    const credentials = {
      email: email.value,
      password: password.value
    }
    const mutation = `mutation LoginUser($credentials: CredentialsInput) {
      loginUser(credentials: $credentials) {
        id
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
    console.log(response);
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

export default Login;