import './sign-up-form.styles.scss'
import { useState } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'
import Cookies from 'universal-cookie'

import { GET_USER, ADD_USER } from 'graphql/user.queries'
import Input from 'components/input/input.component'
import Button from 'components/button/button.component'


const defaultFormFields = {
  display_name: '',
  email: '',
  password: '',
  confirm_password: ''
}

const SignUpForm = () => {
  const [ GetUser, { data: getUserData, error: getUserError } ] = useLazyQuery(GET_USER)
  const [ AddUser, { data, error } ] = useMutation(ADD_USER)
  const [ formFields, setFormFields ] = useState(defaultFormFields)
  const { display_name, email, password, confirm_password } = formFields

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if(password !== confirm_password)
      return alert('passwords do not match')

    GetUser({ variables: { display_name, email, password } })

    if (getUserError)
      return console.error('An error occurred verifying your identity: ', error.message)

    const userExists = getUserData.GetUser

    if (userExists)
      return alert('This email is already in use. Please try to log in instead.')

    AddUser({ variables: { display_name, email, password } })

    if(error)
      return console.error('An error occurred submitting new user: ', error.message)

    const token = data.AddUser

    if (token) {
      const cookies = new Cookies()
      cookies.set('refreshToken', token.exp, {
        path: '/',
        expires: new Date(token.exp * 1000),
        sameSite: 'lax'
      })
      // Register token

      resetFormFields()
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <div className='sign-up-container'>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <Input
          label='Display Name'
          type='text'
          required
          onChange={handleChange}
          name='display_name'
          value={display_name}
        />

        <Input
          label='Email'
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        />

        <Input
          label='Password'
          type='password' required onChange={handleChange}
          name='password'
          value={password}
        />
        
        <Input
          label='Confirm Password'
          type='password'
          required
          onChange={handleChange}
          name='confirm_password'
          value={confirm_password}
        />

        <Button type='submit'>Sign Up</Button>
      </form>
    </div>
  )
}

export default SignUpForm