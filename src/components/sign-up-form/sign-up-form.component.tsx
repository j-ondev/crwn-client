import { ChangeEvent, FormEvent, useState } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'

import { useAppDispatch } from 'hooks/redux'
import { isApolloError } from 'utils/ts/predicates'
import { GET_USER, ADD_USER } from 'apollo/user.queries'
import { setUser } from 'features/user/user.slice'

import Input from 'components/input/input.component'
import Button from 'components/button/button.component'

import type { User, UserArrayResult, UserInputResult } from 'apollo/types/user'
import { UserErrorCodes } from 'apollo/types/errors'

import { SignUpContainer } from './sign-up-form.styles'

const defaultFormFields = {
  display_name: '',
  email: '',
  password: '',
  confirm_password: '',
}

type GetUserResult = {
  User: UserArrayResult
}

type AddUserResult = {
  AddUser: UserInputResult
}

type GetUserVariables = {
  filter: {
    email: string
  }
}

type AddUserVariables = Pick<User, 'display_name' | 'email' | 'password'>

const SignUpForm = () => {
  const dispatch = useAppDispatch()
  const [GetUser] = useLazyQuery<GetUserResult, GetUserVariables>(GET_USER)
  const [AddUser] = useMutation<AddUserResult, AddUserVariables>(ADD_USER)
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { display_name, email, password, confirm_password } = formFields

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!display_name || !email || !password || !confirm_password)
      return alert('You must fill all the fields to register')

    if (password !== confirm_password) return alert('Passwords do not match')

    const { data: UserData } = await GetUser({
      variables: {
        filter: {
          email,
        },
      },
    })

    const userExists = UserData?.User
    if (typeof userExists === 'undefined')
      return alert('Failed to communicate with server.')

    if (userExists.__typename === 'UserArray')
      return alert(
        'This email is already in use. Please try to log in instead.'
      )
    else if (
      isApolloError(userExists) &&
      userExists.code !== UserErrorCodes.NOT_FOUND
    )
      return alert(userExists.code)

    const { data: AddUserData } = await AddUser({
      variables: { display_name, email, password },
    })

    const newUser = AddUserData?.AddUser
    if (typeof newUser === 'undefined')
      return alert('Failed to communicate with server.')

    if (isApolloError(newUser)) return alert(newUser.code)

    const { access_token, exp } = newUser

    dispatch(setUser({ access_token, exp }))
    resetFormFields()
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <SignUpContainer>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <Input
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="display_name"
          value={display_name}
        />

        <Input
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <Input
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <Input
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirm_password"
          value={confirm_password}
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </SignUpContainer>
  )
}

export default SignUpForm
