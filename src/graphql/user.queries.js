import { gql } from '@apollo/client'

export const GET_USER = gql`
  query GetUser($conditions: UserInput!) {
    User(conditions: $conditions) {
      id,
      email,
      display_name
    }
  }
`

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

export const SIGN_IN = gql`
  mutation SignIn($email: String!,$password: String!) {
    SignIn(email: $email, password: $password) {
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
    SignInGoogle(credential: $credential) {
      access_token,
      exp
    }
  }
`