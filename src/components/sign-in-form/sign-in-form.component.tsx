import { useState, useEffect, FormEvent, ChangeEvent } from 'react'
import { useMutation } from '@apollo/client'

import { useAppDispatch } from 'hooks/redux'
import { isApolloError } from 'utils/ts/predicates'
import { setUser } from 'features/user/user.slice'
import { SIGN_IN } from 'apollo/user.queries'

import Input from 'components/input/input.component'
import Button from 'components/button/button.component'

import type { UserInputResult } from 'apollo/types/user'

import { SignInContainer, ButtonContainer } from './sign-in-form.styles'

type SignInResult = { SignIn: UserInputResult }
type SignInVariables = {
  email: string
  password: string
}

const defaultFormFields = {
  in_email: '',
  in_password: '',
}

const SignInForm = () => {
  const dispatch = useAppDispatch()
  const [SignIn] = useMutation<SignInResult, SignInVariables>(SIGN_IN)
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { in_email, in_password } = formFields

  useEffect(() => {
    const googleButton = document.getElementById('g-button-sign-in')

    if (googleButton) {
      google.accounts.id.renderButton(googleButton, {
        theme: 'filled_blue',
        size: 'large',
        type: 'icon',
      })
      google.accounts.id.cancel()
    }
  })

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!in_email || !in_password)
      return alert('You must fill all the fields to register')

    const { data: signInData } = await SignIn({
      variables: { email: in_email, password: in_password },
    })

    const user = signInData?.SignIn
    if (typeof user === 'undefined')
      return alert('Failed to communicate with server.')

    if (isApolloError(user)) return alert(user.code)

    const { access_token, exp } = user

    dispatch(setUser({ access_token, exp }))
    resetFormFields()
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <SignInContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="in_email"
          value={in_email}
        />

        <Input
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="in_password"
          value={in_password}
        />

        <ButtonContainer>
          <Button type="submit">Sign In</Button>
          {/**
           * At the moment google button has to be rendered with just the ICON
           * since it can't be customized at all and it's width is very large
           */}
          <div id="g-button-sign-in"></div>
        </ButtonContainer>
      </form>
    </SignInContainer>
  )
}

export default SignInForm
