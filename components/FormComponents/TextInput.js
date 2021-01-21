
export const TextInput = ({ children, controls, name }) => {
  return (
    <label htmlFor={name}>
      {children}
      <input
        {...controls}
        type="text"
        name={name}
        id={name} />
    </label>
  )
}