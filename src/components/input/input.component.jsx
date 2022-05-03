import './input.styles.scss'

const Input = ({ label, id, name,...otherProps }) => {
  return (
    <div className='group'>
      <input
        className='form-input'
        id={id || name}
        name={name || id}
        {...otherProps}
      />
      { label && (
        <label
          className={`${
            otherProps.value.length ? 'shrink' : ''
          } form-input-label`}
          htmlFor={otherProps.name}
        >
          {label}
        </label>
      )}
    </div>
  )
}

export default Input