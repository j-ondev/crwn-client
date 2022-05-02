import { useMutation } from '@apollo/client'
import googleOneTap from 'google-one-tap'
import Cookies from 'universal-cookie'

import { getEnv } from 'helpers/config'
import { SIGN_IN_GOOGLE, SIGN_UP_GOOGLE } from 'graphql/user.queries'

const clientId = getEnv('GOOGLE_CLIENT_ID')

const GoogleOneTap = () => {
  const [signUpGoogle] = useMutation(SIGN_UP_GOOGLE)
  const [signInGoogle] = useMutation(SIGN_IN_GOOGLE)

  googleOneTap({
    client_id: clientId
  }, async (res) => {
    const { credential } = res
    const { data: signInData, signInErrors } = await signInGoogle({ variables: { credential } })

    if(signInErrors) {
      signInErrors.map(error => console.error(error.message))
      return { error: 'Failed to fetch google user' }
    }

    let token = signInData.SignInGoogle

    if (!token) {
      const {data: signUpData, errors: signUpErrors} = await signUpGoogle(credential)

      if (signUpErrors) {
        signInErrors.map(error => console.error(error.message))
        return { error: 'Failed to sign up with google account' }  
      }

      token = signUpData.SignUpGoogle
    }
    
    const cookies = new Cookies()
    cookies.set('refreshToken', token.exp, {
      path: '/',
      expires: new Date(token.exp * 1000),
      sameSite: 'lax'
    })

    // TODO: RESERVE token.access_token INSIDE A STORE
  })
}

export default GoogleOneTap