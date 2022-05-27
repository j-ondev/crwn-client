/* eslint-disable no-undef */
import { useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { useAppDispatch, useAppSelector } from './redux'

import type { QueryResultError, UserToken } from 'apollo/types'

import { getEnv } from 'utils/config'
import { setUser } from 'features/user/user.slice'
import { isApolloError } from 'utils/ts/predicates'
import { selectUser } from 'features/user/user.selector'
import { SIGN_IN_GOOGLE, SIGN_UP_GOOGLE } from 'apollo/user.queries'

const client_id = getEnv('GOOGLE_CLIENT_ID')

type CredentialResponse = {
  credential: string
  select_by: string
}

const useGoogleLogin = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const [SignUpGoogle] = useMutation(SIGN_UP_GOOGLE)
  const [SignInGoogle] = useMutation<
    { SignInGoogle: UserToken | QueryResultError },
    { credential: string }
  >(SIGN_IN_GOOGLE)

  useEffect(() => {
    if (!user) {
      google.accounts.id.initialize({
        client_id,
        callback: handleGoogleSignIn,
      })

      google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment())
          console.log(notification.getNotDisplayedReason)
      })
    } else {
      google.accounts.id.cancel()
    }
  }, [user])

  const handleGoogleSignIn = async (res: CredentialResponse) => {
    const { credential } = res
    const { data: signInData } = await SignInGoogle({
      variables: { credential },
    })

    const userExists = signInData?.SignInGoogle
    if (typeof userExists === 'undefined')
      alert('Failed to comunicate with server.')

    let token: UserToken = userExists as UserToken

    // The correct approach should be using a modal/toast
    // or some sort of ui-friendly feedback tool
    if (isApolloError(userExists)) {
      if (userExists.code !== 'user/not-found') return alert(userExists.code)
      else {
        const signUpResult = await SignUpGoogle({
          variables: { credential },
        })

        const newUser: UserToken | QueryResultError =
          signUpResult.data.SignUpGoogle

        if (isApolloError(newUser)) return alert(newUser.code)

        token = newUser
      }
    }

    const { access_token, exp } = token
    dispatch(setUser({ access_token, exp }))
  }
}

export default useGoogleLogin
