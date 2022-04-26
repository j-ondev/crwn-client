import axios from 'axios'
import googleOneTap from 'google-one-tap'

import { getEnv } from 'helpers/config'

const [ clientId, apiUrl ] = getEnv(['GOOGLE_CLIENT_ID', 'API_URL'])

export function googleLoginModal() {
  googleOneTap({
    client_id: clientId
  }, async (res) => {
    const { data: userData } = await axios.post(`${apiUrl}/auth/google/verify`, res)
    
    if (userData.error) return console.error

    const { data: token } = await axios.post(`${apiUrl}/auth/google/authenticate`, userData)

    // TODO: CREATE A LOCALSTORAGE VARIABLE TO RENEW TOKEN EACH 1H

    // Needs a better handler
    if (token.errors)
      token.errors.map(message => console.error('Error fetching user: ', message))
  })
}