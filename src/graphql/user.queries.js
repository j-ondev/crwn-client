import { gql } from '@apollo/client'

export const GET_SOCIAL_USER = gql`
  query socialUser($identifier: ID!, $provider: String!) {
    socialUser(identifier: $identifier, provider: $provider) {
      id,
      display_name,
      email
    }
  }
`

export const ADD_GOOGLE_USER = gql`
  mutation AddGoogleUser($credential: String!) {
    AddGoogleUser(credential: $credential) {
      accessToken,
      exp
    }
  }
`