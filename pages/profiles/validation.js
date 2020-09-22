

const Validate = () => {
  const handleClick = async () => {
    const mutation = `
      mutation Validation {
        validateUser 
      }
    `;
    const validationRes = await fetch('/api/graphql', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: mutation,
      })
    });
    const validationJSON = await validationRes.json();
    console.log(validationJSON);
  }
  return (
    <div>
      <h3>Validate Test</h3>
      <button onClick={() => handleClick()} >Validate!</button>
    </div>
  )
}

export default Validate;