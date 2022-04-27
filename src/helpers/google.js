import axios from 'axios'
import googleOneTap from 'google-one-tap'

import { getEnv } from 'helpers/config'

const [ clientId, apiUrl ] = getEnv(['GOOGLE_CLIENT_ID', 'API_URL'])

export function googleLoginModal() {
  googleOneTap({
    client_id: clientId
  }, async (res) => {
    const { data: token } = await axios.post(`${apiUrl}/auth/google/authenticate`, res)
    if (token.errors)
      return token.errors.map(message => console.error('Error fetching user: ', message))

    localStorage.setItem('refreshToken', token.exp_time)

    // TODO: RESERVE TOKEN INSIDE A STORE

    // Needs a better handler, maybe a modal for feedback
  })
}