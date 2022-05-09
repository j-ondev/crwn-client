import { AuthenticationContainer } from './authentication.styles'

import SignInForm from 'components/sign-in-form/sign-in-form.component'
import SignUpForm from 'components/sign-up-form/sign-up-form.component'

const SignIn = () => {
  return (
    <AuthenticationContainer>
      <SignInForm />
      <SignUpForm />
    </AuthenticationContainer>
  )
}

export default SignIn
