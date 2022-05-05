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
    const {
      data: { SignInGoogle: userExists },
    } = await SignInGoogle({
      variables: { credential },
    })

    // The correct approach should be using a modal/toast
    // or some sort of ui-friendly feedback tool
    if (
      userExists.__typename === 'UserError' &&
      !userExists.code !== 'user/not-found'
    )
      return alert(userExists.code)

    let token = userExists.__typename === 'JsonWebToken' && userExists

    if (!token.access_token && !token.exp) {
      const {
        data: { SignUpGoogle: newUser },
      } = await SignUpGoogle({
        variables: { credential },
      })

      if (newUser.__typename === 'UserError') return alert(newUser.code)

      token = newUser.__typename === 'JsonWebToken' && newUser
    }

    if (token) {
      const cookies = new Cookies()
      cookies.set('refreshToken', token.exp, {
        path: '/',
        expires: new Date(token.exp * 1000),
        sameSite: 'lax',
      })

      setCurrentUser(token.access_token)
    }
  }
}

export default useGoogleLogin
