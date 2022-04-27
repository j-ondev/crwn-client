import axios from 'axios'
import googleOneTap from 'google-one-tap'

import { getEnv } from 'helpers/config'

const [ clientId, apiUrl ] = getEnv(['GOOGLE_CLIENT_ID', 'API_URL'])

export function googleLoginModal() {
  googleOneTap({
    client_id: clientId
  }, async (res) => {
    const { data } = await axios.post(`${apiUrl}/auth/google/authenticate`, res)

    if (data) {
      if (data.errors)
        return data.errors.map(message => console.error('Error fetching user: ', message))
      
      localStorage.setItem('refreshToken', data.exp_time)
      // TODO: RESERVE ACCESSTOKEN INSIDE A STORE
    } else console.error('Error authenticating user')

    // Needs a better handler, maybe a modal for feedback
  })
}