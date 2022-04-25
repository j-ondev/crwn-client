import axios from 'axios'
import { useGoogleLogin, GoogleLogout } from 'react-google-login'

import { getEnv } from 'helpers/config'
import { refreshToken } from 'helpers/google'

const [ clientId, apiUrl ] = getEnv(['GOOGLE_CLIENT_ID', 'API_URL'])

const GButtonLogin = (props) => {
  const onSuccess = (res) => {
    axios.post(`${apiUrl}/auth/google/w`, {
      tokenId: res.tokenId
    })

    refreshToken(res)
  }

  const onFailure = (res) => {
    console.error(res)
  }

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    cookiePolicy: 'single_host_origin'
  })

  return (
    <div>
      <button onClick={signIn} className='button'>
        <img src='icons/google.svg' alt='Google letter G icon'/>
        <span className='buttonText'>{props.buttonText}</span>
      </button>
      <GoogleLogout
        clientId={clientId}
        buttonText='Logout'
        onLogoutSuccess={() => console.log('Logged out')}
      />
    </div>
  )
}

export default GButtonLogin