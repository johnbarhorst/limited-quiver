import { useInput } from 'hooks';


const NewUser = () => {
  const [username, resetUserName] = useInput('');
  const [email, resetEmail] = useInput('');
  const [firstname, resetFirstName] = useInput('');
  const [lastname, resetLastName] = useInput('');

  const handleSubmit = e => {
    e.preventDefault();
    const data = {
      username: username.value,
      email: email.value,
      firstname: firstname.value,
      lastname: lastname.value
    }
    fetch('/api/users/newuser', {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  const handleReset = e => {
    resetUserName();
    resetEmail();
    resetFirstName();
    resetLastName();
  }

  return (
    <div>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <div>
          <label htmlFor="username">User Name:</label>
          <input type="text" placeholder="User Name" name="username" {...username} />
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
        <button type="submit">Register</button><button type="reset">Clear Form</button>
      </form>
    </div>
  )
}

export default NewUser;