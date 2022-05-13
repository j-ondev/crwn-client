import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLazyQuery, useMutation } from '@apollo/client'

import { GET_USER, ADD_USER } from 'apollo/user.queries'
import { setCurrentUser } from 'redux/user/user.slice.js'

import Input from 'components/input/input.component'
import Button from 'components/button/button.component'

import { SignUpContainer } from './sign-up-form.styles.jsx'

const defaultFormFields = {
  display_name: '',
  email: '',
  password: '',
  confirm_password: '',
}

const SignUpForm = () => {
  const dispatch = useDispatch()
  const [GetUser] = useLazyQuery(GET_USER)
  const [AddUser] = useMutation(ADD_USER)
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { display_name, email, password, confirm_password } = formFields

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!display_name || !email || !password || !confirm_password)
      return alert('You must fill all the fields to register')

    if (password !== confirm_password) return alert('Passwords do not match')

    const {
      data: { User: userExists },
    } = await GetUser({
      variables: {
        filter: {
          email,
        },
      },
    })

    if (userExists.__typename === 'UserArray')
      return alert(
        'This email is already in use. Please try to log in instead.'
      )

    const {
      data: { AddUser: newUser },
    } = await AddUser({
      variables: { display_name, email, password },
    })

    if (newUser.__typename === 'UserError') return alert(newUser.code)

    if (newUser.__typename === 'JsonWebToken') {
      localStorage.setItem(
        'accessToken',
        JSON.stringify({
          key: newUser.access_token,
          exp: newUser.exp,
        })
      )

      dispatch(setCurrentUser(newUser.access_token))
      resetFormFields()
    }
  }

  const handleChange = (event) => {
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
