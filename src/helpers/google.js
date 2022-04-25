import axios from 'axios'
import { getEnv } from 'helpers/config'

const [ apiUrl ] = getEnv(['API_URL'])

// TODO: NEED TO BE VERIFIED IF WORKS
// TODO: CREATE ANOTHER METHOD TO REFRESH MORE RELIABLE
export const refreshToken = (res) => {
  let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000

  const newToken = async () => {
    const newAuthRes = await res.reloadAuthResponse()

    axios.post(`${apiUrl}/auth/google/w`, {
      tokenId: newAuthRes.id_token
    })

    setTimeout(newToken, refreshTiming)
  }

  setTimeout(newToken, refreshTiming)
}