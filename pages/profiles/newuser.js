import { useInput } from 'hooks';


const NewUser = () => {
  const [username, resetUserName] = useInput('');
  const [email, resetEmail] = useInput('');
  const [firstname, resetFirstName] = useInput('');
  const [lastname, resetLastName] = useInput('');
  const [password, resetPassword] = useInput('');
  const [passwordMatch, resetPasswordMatch] = useInput('');

  const handleSubmit = e => {
    e.preventDefault();
    // TODO: UI for password match, and actual pw regex reqs
    if (password.value !== passwordMatch.value) return console.log('Passwords need to match');

    const data = {
      username: username.value,
      email: email.value,
      name: {
        first: firstname.value,
        last: lastname.value
      },
      password: password.value
    }

    // create queries/mutations as a string.
    // declare variables in the string by naming the query/mutation
    const mutation = `mutation CreateUser($user: UserInput) {
      newUser(user: $user) {
        id
        username
      }
    }`;

    fetch('/api/graphql', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: mutation,
        variables: {
          user: data
        }
      })
    })
  }

  const handleReset = e => {
    resetUserName();
    resetEmail();
    resetFirstName();
    resetLastName();
    resetPassword();
    resetPasswordMatch();
  }

  return (
    <div>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <div>
          <label htmlFor="username">User Name:</label>
          <input type="text" placeholder="User Name" name="username" {...username} required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" placeholder="myEmail@dontspammebro.net" name="email" {...email} />
        </div>
        <div>
          <label htmlFor="firstname">First Name:</label>
          <input type="text" name="firstname" {...firstname} />
        </div>
        <div>
          <label htmlFor="lastname">Last Name:</label>
          <input type="text" name="lastname" {...lastname} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" {...password} />
        </div>
        <div>
          <label htmlFor="password">Verify Password:</label>
          <input type="password" name="password" {...passwordMatch} />
        </div>
        <button type="submit">Register</button><button type="reset">Clear Form</button>
      </form>
    </div>
  )
}

export default NewUser;