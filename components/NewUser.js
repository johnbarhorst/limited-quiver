import { useMutation, gql } from '@apollo/client';
import { useInput, useMatchingInput } from 'hooks';
import { ErrorDisplay, Modal } from 'components'
import { TextInput, Form, Button } from 'elements';
import { useAppContext } from 'state';


// Create queries/mutations as a string.
// Declare variables in the string by naming the query/mutation
// UserInput is declared in the GQL schema type for user,
//  not just some willy nilly name
// CreateUser though, is just the name we decided on here for this operation.
// Naming operations is helpful for debugging, and necessary if you're going to do more than
//  one of the same operation
const CREATE_USER = gql`
mutation CreateUser($user: UserInput) {
  newUser(user: $user) {
    id
    username
  }
}`;

export const NewUser = () => {
  const [createUser, { data, error, loading }] = useMutation(CREATE_USER, { onError: err => console.log(err) });
  const { setUser } = useAppContext();
  const [username, resetUserName] = useInput('');
  const [email, resetEmail] = useInput('');
  const [firstname, resetFirstName] = useInput('');
  const [lastname, resetLastName] = useInput('');
  const [password, resetPassword] = useInput('');
  const [passwordMatch, resetPasswordMatch, isMatching] = useMatchingInput('', password.value);


  const handleSubmit = async e => {
    e.preventDefault();
    // TODO: UI for password match, and actual pw regex reqs
    if (password.value !== passwordMatch.value) return console.log('Passwords need to match');
    // get user data from the form states
    const formData = {
      username: username.value,
      email: email.value,
      name: {
        first: firstname.value,
        last: lastname.value
      },
      password: password.value
    }
    createUser({
      variables: { user: formData }
    });
  }

  const formReset = () => {
    resetUserName();
    resetEmail();
    resetFirstName();
    resetLastName();
    resetPassword();
    resetPasswordMatch();
  }

  return (

    <Form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">User Name:</label>
        <TextInput type="text" placeholder="User Name" name="username" {...username} required />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <TextInput type="email" placeholder="myEmail@dontspammebro.net" name="email" {...email} />
      </div>
      <div>
        <label htmlFor="firstname">First Name:</label>
        <TextInput type="text" name="firstname" {...firstname} />
      </div>
      <div>
        <label htmlFor="lastname">Last Name:</label>
        <TextInput type="text" name="lastname" {...lastname} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <TextInput type="password" name="password" {...password} />
      </div>
      <div>
        <label htmlFor="password">Verify Password:</label>
        <TextInput type="password" name="password" {...passwordMatch} />
      </div>
      <div>
        {isMatching ? <p>Matches</p> : <p>Doesn't Match</p>}

      </div>
      <div>
        {error && <ErrorDisplay message={error.message} />}
      </div>
      <div>
        <Button type="submit">Register</Button>
      </div>
    </Form>

  )
}
