import { FormInputLabel, Group, FormInput } from './input.styles'

const Input = ({ label, id, name, ...otherProps }) => {
  return (
    <Group>
      <FormInput id={id || name} name={name || id} {...otherProps} />
      {label && (
        <FormInputLabel
          shrink={otherProps.value.length}
          htmlFor={otherProps.name}
        >
          {label}
        </FormInputLabel>
      )}
    </Group>
  )
}

export default Input
