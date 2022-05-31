import { AuthenticationContainer } from './auth.styles'

import SignInForm from 'components/sign-in-form/sign-in-form.component'
import SignUpForm from 'components/sign-up-form/sign-up-form.component'

const Auth = () => {
  return (
    <AuthenticationContainer>
      <SignInForm />
      <SignUpForm />
    </AuthenticationContainer>
  )
}

export default Auth
