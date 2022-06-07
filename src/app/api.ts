import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from '@apollo/client'
import { EnhancedStore } from '@reduxjs/toolkit'

import { getEnv } from 'utils/config'

const apiUrl = getEnv('API_URL')

let store: EnhancedStore

export const injectStore = (_store: EnhancedStore) => {
  store = _store
}

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
