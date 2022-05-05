/* eslint-disable no-undef */
import { useContext, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import Cookies from 'universal-cookie'

import { getEnv } from 'helpers/config'
import { UserContext } from 'contexts/user.context'
import { SIGN_IN_GOOGLE, SIGN_UP_GOOGLE } from 'graphql/user.queries'

const client_id = getEnv('GOOGLE_CLIENT_ID')

const useGoogleLogin = () => {
  const [SignUpGoogle] = useMutation(SIGN_UP_GOOGLE)
  const [SignInGoogle] = useMutation(SIGN_IN_GOOGLE)

  const { setCurrentUser } = useContext(UserContext)

  useEffect(() => {
    google.accounts.id.initialize({
      client_id,
      callback: handleGoogleSignIn,
      cancel_on_tap_outside: false,
    })
    google.accounts.id.prompt()
  })

  const handleGoogleSignIn = async (res) => {
    const { credential } = res
    const { data: SignInData, SignInErrors } = await SignInGoogle({
      variables: { credential },
    })

    if (SignInErrors) {
      SignInErrors.map((error) => console.error(error.message))
      return { error: 'Failed to fetch google user' }
    }

    let token = SignInData.SignInGoogle

    if (!token) {
      const { data: SignUpData, errors: SignUpErrors } = await SignUpGoogle({
        variables: { credential },
      })

      if (SignUpErrors) {
        SignInErrors.map((error) => console.error(error.message))
        return { error: 'Failed to sign up with google account' }
      }

      token = SignUpData.SignUpGoogle
    }

    const cookies = new Cookies()
    cookies.set('refreshToken', token.exp, {
      path: '/',
      expires: new Date(token.exp * 1000),
      sameSite: 'lax',
    })

    setCurrentUser(token.access_token)
  }
}

export default useGoogleLogin
