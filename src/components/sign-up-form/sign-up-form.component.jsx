import { useState } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'
import { GET_USER, ADD_USER } from 'graphql/user.queries'

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

  const handleSubmit = async (event) => {
    event.preventDefault()

    if(password !== confirm_password)
      return alert('passwords do not match')

    GetUser({ variables: { display_name, email, password } })

    if (getUserError)
      return console.error('An error occurred verifying your identity: ', error.message)

    const userExists = data.GetUser

    if (userExists)
      return console.error('This email is already in use. Please try to log in instead.')

    AddUser({ variables: { display_name, email, password } })

    if(error)
      return console.error('An error occurred submitting new user: ', error.message)

    const user = data.AddUser
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <div>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor=''>Display Name</label>
        <input
          type='text'
          required
          onChange={handleChange}
          name='display_name'
          value={display_name}
        />

        <label htmlFor=''>Email</label>
        <input
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        />

        <label htmlFor=''>Password</label>
        <input
          type='password' required onChange={handleChange}
          name='password'
          value={password}
        />

        <label htmlFor=''>Confirm Password</label>
        <input
          type='password'
          required
          onChange={handleChange}
          name='confirm_password'
          value={confirm_password}
        />

        <button type='submit'>Sign Up</button>
      </form>
    </div>
  )
}

export default SignUpForm