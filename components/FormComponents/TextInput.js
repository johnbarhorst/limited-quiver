
export const TextInput = ({ children, controls, ...props }) => {
  return (
    <label htmlFor={props.id || null}>
      {children}
      <input
        {...controls}
        {...props} />
    </label>
  )
}