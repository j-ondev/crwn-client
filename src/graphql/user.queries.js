import { gql } from '@apollo/client'

export const ADD_USER = gql`
  mutation AddUser(
    $display_name: String!,
    $email: String!,
    $password: String!
  ) {
    AddUser(
      display_name: $display_name,
      email: $email,
      password: $password
    ) {
      access_token,
      exp
    }
  }
`

export const SIGN_UP_GOOGLE = gql`
  mutation SignUpGoogle($credential: String!) {
    SignUpGoogle(credential: $credential) {
      access_token,
      exp
    }
  }
`

export const SIGN_IN_GOOGLE = gql`
  mutation SignInGoogle($credential: String!) {
    signInGoogle(credential: $credential) {
      access_token,
      exp
    }
  }
`