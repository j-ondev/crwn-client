import { useState, useContext, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import Cookies from 'universal-cookie'

import { UserContext } from 'contexts/user.context'
import { SIGN_IN } from 'graphql/user.queries'

import Input from 'components/input/input.component'
import Button from 'components/button/button.component'

import './sign-in-form.styles.scss'

const defaultFormFields = {
  in_email: '',
  in_password: '',
}

const SignInForm = () => {
  const [SignIn] = useMutation(SIGN_IN)
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { in_email, in_password } = formFields

  const { setCurrentUser } = useContext(UserContext)

  useEffect(() => {
    // eslint-disable-next-line no-undef
    google.accounts.id.renderButton(
      document.getElementById('g-button-sign-in'),
      { theme: 'filled_blue', size: 'large', type: 'icon' }
    )
  })

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!in_email || !in_password)
      return alert('You must fill all the fields to register')

    const {
      data: { SignIn: token },
      error,
    } = await SignIn({ variables: { email: in_email, password: in_password } })

    if (error) return alert(error.message)

    if (token) {
      const cookies = new Cookies()
      cookies.set('refreshToken', token.exp, {
        path: '/',
        expires: new Date(token.exp * 1000),
        sameSite: 'lax',
      })

      setCurrentUser(token.access_token)

      resetFormFields()
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <div className="sign-in-container">
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

        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          {/**
           * At the moment google button has to be rendered with just the ICON
           * since it can't be customized at all and it's width is very large
           */}
          <div id="g-button-sign-in"></div>
        </div>
      </form>
    </div>
  )
}

export default SignInForm
