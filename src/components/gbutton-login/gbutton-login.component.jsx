import { useGoogleLogin } from 'react-google-login'
import { getEnv } from 'utils/config'

const clientId = getEnv('GOOGLE_CLIENT_ID')

console.log(process.env)

const GButtonLogin = (props) => {
  const onSuccess = (res) => {
    console.log('[Login Success] res: ', res.profileObj)
  }

  const onFailure = (res) => {
    console.log('[Login failed] res: ', res)
  }

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    cookiePolicy: 'single_host_origin'
  })

  return (
    <button onClick={signIn} className='button'>
      <img src='icons/google.svg' alt='Google letter G icon'/>
      <span className='buttonText'>{props.buttonText}</span>
    </button>
  )
}

export default GButtonLogin