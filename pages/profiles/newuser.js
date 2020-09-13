import { useInput, useMatchingInput } from 'hooks';
import { TextInput, Form } from 'elements';

const NewUser = () => {
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
    const data = {
      username: username.value,
      email: email.value,
      name: {
        first: firstname.value,
        last: lastname.value
      },
      password: password.value
    }

    // Create queries/mutations as a string.
    // Declare variables in the string by naming the query/mutation
    // UserInput is declared in the GQL schema type for user,
    //  not just some willy nilly name
    // CreateUser though, is just the name we decided on here for this operation.
    // Naming operations is helpful for debugging, and necessary if you're going to do more than
    //  one of the same operation
    const mutation = `mutation CreateUser($user: UserInput) {
      newUser(user: $user) {
        id
        username
      }
    }`;

    const fetchRes = await fetch('/api/graphql', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      // Pass mutation string along with user
      body: JSON.stringify({
        query: mutation,
        variables: {
          user: data
        }
      })
    });
    const responseData = await fetchRes.json();
    console.log(responseData)
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
      <button type="submit">Register</button>
    </Form>

  )
}

export default NewUser;