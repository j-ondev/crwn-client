/* eslint-disable no-undef */
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useMutation } from '@apollo/client'

import { getEnv } from 'utils/config'
import { setCurrentUser } from 'redux/user/user.slice'
import { SIGN_IN_GOOGLE, SIGN_UP_GOOGLE } from 'apollo/user.queries'

const client_id = getEnv('GOOGLE_CLIENT_ID')

const useGoogleLogin = () => {
  const dispatch = useDispatch()
  const [SignUpGoogle] = useMutation(SIGN_UP_GOOGLE)
  const [SignInGoogle] = useMutation(SIGN_IN_GOOGLE)

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      google.accounts.id.initialize({
        client_id,
        callback: handleGoogleSignIn,
      })
      google.accounts.id.prompt()
    } else {
      google.accounts.id.cancel()
    }
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
      localStorage.setItem(
        'accessToken',
        JSON.stringify({
          key: token.access_token,
          exp: token.exp,
        })
      )
      dispatch(setCurrentUser(token.access_token))
    }
  }
}

export default useGoogleLogin
