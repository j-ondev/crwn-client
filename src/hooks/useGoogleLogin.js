/* eslint-disable no-undef */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@apollo/client'

import { getEnv } from 'utils/config'
import { setUser } from 'features/user/user.slice'
import { SIGN_IN_GOOGLE, SIGN_UP_GOOGLE } from 'apollo/user.queries'
import { selectUser } from 'features/user/user.selector'

const client_id = getEnv('GOOGLE_CLIENT_ID')

const useGoogleLogin = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const [SignUpGoogle] = useMutation(SIGN_UP_GOOGLE)
  const [SignInGoogle] = useMutation(SIGN_IN_GOOGLE)

  useEffect(() => {
    if (!user) {
      google.accounts.id.initialize({
        client_id,
        callback: handleGoogleSignIn,
      })

      google.accounts.id.prompt()
    } else {
      google.accounts.id.cancel()
    }
  }, [user])

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

    const { access_token, exp } = token

    if (access_token && exp) {
      dispatch(setUser({ access_token, exp }))
    }
  }
}

export default useGoogleLogin
