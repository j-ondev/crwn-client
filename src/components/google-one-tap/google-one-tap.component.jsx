import { useLazyQuery, useMutation } from '@apollo/client'
import googleOneTap from 'google-one-tap'
import axios from 'axios'
import Cookies from 'universal-cookie'

import { getEnv } from 'helpers/config'
import { GET_SOCIAL_USER, ADD_GOOGLE_USER } from 'graphql/user.queries'

const [ clientId, apiUrl ] = getEnv(['GOOGLE_CLIENT_ID', 'API_URL'])

const GoogleOneTap = () => {
  const [addGoogleUser] = useMutation(ADD_GOOGLE_USER)
  const [getSocialUser] = useLazyQuery(GET_SOCIAL_USER)

  googleOneTap({
    client_id: clientId
  }, async (res) => {
    const { credential } = res

    /**
     * googleid
     * display_name
     * email
     * exp
     */
    const token = await axios.post(apiUrl+'/auth/google', { credential })
      .then(async ({ data: payload }) => {
        const dbUser = await getSocialUser({
          variables: {
            identifier: payload.googleid,
            provider: 'google',
            payload
          }
        })

        if (dbUser.error)
          return {
            error: `Error retrieving user data: ${dbUser.error.message}`
          }
    
        let { socialUser: user } = dbUser.data
    
        if (!user) {
          const result = await addGoogleUser(payload)
    
          if (result.errors) {
            result.errors.map(error => console.error(error.message))
            return { error: 'Failed to fetch google user' }
          }

          user = result.data
        }

        const { data: accessToken } = await axios.post(apiUrl+'/auth/local/generateToken', {
          subject: user.id,
          name: user.display_name,
          email: user.email
        }).catch(error => { return { error } })

        if (accessToken.error) return { error: accessToken.error }

        return { accessToken, exp: payload.exp }
      })
      .catch(error => console.error('Error ', error.message))

    if (token.error) return console.error(token.error)

    const cookies = new Cookies()
    cookies.set('refreshToken', token.exp, {
      path: '/',
      expires: new Date(token.exp * 1000)
    })

    // TODO: RESERVE token.accessToken INSIDE A STORE
  })
}

export default GoogleOneTap