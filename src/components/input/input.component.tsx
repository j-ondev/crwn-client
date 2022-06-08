import { InputHTMLAttributes, FC } from 'react'

import { FormInputLabel, Group, FormInput } from './input.styles'

type FormInputProps = {
  label?: string
} & InputHTMLAttributes<HTMLInputElement>

const Input: FC<FormInputProps> = ({ label, id, name, ...otherProps }) => {
  return (
    <Group>
      <FormInput id={id || name} name={name || id} {...otherProps} />
      {label && (
        <FormInputLabel
          shrink={Boolean(
            typeof otherProps.value === 'string' && otherProps.value?.length
          )}
          htmlFor={name}
        >
          {label}
        </FormInputLabel>
      )}
    </Group>
  )
}

export default Input
