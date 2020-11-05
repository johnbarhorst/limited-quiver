import { useAppContext } from 'state';
import { ErrorDisplay } from 'components';
import { Form, TextInput, Button } from 'elements';
import { useInput } from 'hooks';


export const LoginForm = () => {
  const { setIsLoginOpen, setUser } = useAppContext();
  const [email, resetEmail] = useInput('');
  const [password, resetPassword] = useInput('');


  const handleSubmit = async e => {
    e.preventDefault();
    const credentials = {
      email: email.value,
      password: password.value
    }
    const user = await fetch('/api/auth', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });

    if (user.status === 200) {
      const response = await user.json();
      setUser(response);
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
        <Button type="submit">Sign in</Button>
      </div>
    </Form>
  )
}