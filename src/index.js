import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { PersistGate } from 'redux-persist/integration/react'

import App from './App'
import { getEnv } from 'utils/config'
import { store, persistor } from 'app/store'

import './fonts.scss'
import './index.scss'

const apiUrl = getEnv('API_URL')

const apolloClient = new ApolloClient({
  uri: `${apiUrl}/graphql`,
  cache: new InMemoryCache(),
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
)
