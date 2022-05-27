import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from '@apollo/client'

import { getEnv } from 'utils/config'
import { store } from './store'

const apiUrl = getEnv('API_URL')

const link = new HttpLink({ uri: `${apiUrl}/graphql` })
const authLink = new ApolloLink((operation, forward) => {
  const { user } = store.getState()

  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: user?.access_token,
    },
  }))

  return forward(operation)
})

export const apolloClient = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache(),
})
