import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'

import { setUser } from 'redux/user/user.slice'
import { SIGN_IN } from 'apollo/user.queries'

import Input from 'components/input/input.component'
import Button from 'components/button/button.component'

import { SignInContainer, ButtonContainer } from './sign-in-form.styles'
import { useDispatch } from 'react-redux'

const defaultFormFields = {
  in_email: '',
  in_password: '',
}

const SignInForm = () => {
  const dispatch = useDispatch()
  const [SignIn] = useMutation(SIGN_IN)
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { in_email, in_password } = formFields

  useEffect(() => {
    // eslint-disable-next-line no-undef
    google.accounts.id.renderButton(
      document.getElementById('g-button-sign-in'),
      { theme: 'filled_blue', size: 'large', type: 'icon' }
    )
    // eslint-disable-next-line no-undef
    google.accounts.id.cancel()
  })

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!in_email || !in_password)
      return alert('You must fill all the fields to register')

    const {
      data: { SignIn: user },
    } = await SignIn({ variables: { email: in_email, password: in_password } })

    if (user.__typename === 'UserError') return alert(user.code)

    if (user.__typename === 'JsonWebToken') {
      const { access_token, exp } = user

      dispatch(setUser({ access_token, exp }))
      resetFormFields()
    }
  }

  const handleChange = (event) => {
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
