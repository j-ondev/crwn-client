import { useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { useAppDispatch, useAppSelector } from './redux'

import { getEnv } from 'utils/config'
import { setUser } from 'features/user/user.slice'
import { isApolloError } from 'utils/ts/predicates'
import { selectUser } from 'features/user/user.selector'
import { SIGN_IN_GOOGLE, SIGN_UP_GOOGLE } from 'apollo/user.queries'

import { UserInputResult, UserToken } from 'apollo/types/user'
import { UserErrorCodes } from 'apollo/types/errors'

const client_id = getEnv('GOOGLE_CLIENT_ID')

type SignUpGoogleResult = { SignUpGoogle: UserInputResult }
type SignInGoogleResult = { SignInGoogle: UserInputResult }
type SignGoogleVariables = { credential: string }

type CredentialResponse = {
  credential: string
  select_by: string
}

const useGoogleLogin = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const [SignUpGoogle] = useMutation<SignUpGoogleResult, SignGoogleVariables>(
    SIGN_UP_GOOGLE
  )
  const [SignInGoogle] = useMutation<SignInGoogleResult, SignGoogleVariables>(
    SIGN_IN_GOOGLE
  )

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
      alert('Failed to communicate with server.')

    let token = userExists as UserToken

    // The correct approach should be using a modal/toast
    // or some sort of ui-friendly feedback tool
    if (isApolloError(userExists)) {
      if (userExists.code !== UserErrorCodes.NOT_FOUND)
        return alert(userExists.code)
      else {
        const { data: signUpData } = await SignUpGoogle({
          variables: { credential },
        })

        const newUser = signUpData?.SignUpGoogle

        if (!newUser) return alert('Failed to register user.')
        if (isApolloError(newUser)) return alert(newUser.code)

        token = newUser
      }
    }

    const { access_token, exp } = token
    dispatch(setUser({ access_token, exp }))
  }
}

export default useGoogleLogin
