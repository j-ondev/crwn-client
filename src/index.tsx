import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import { PersistGate } from 'redux-persist/integration/react'
import { Elements } from '@stripe/react-stripe-js'

import store, { persistor } from 'app/store'
import { injectStore, apolloClient } from 'app/api'
import { stripePromise } from 'utils/stripe/stripe.utils'
import App from './App'

import { GlobalStyle } from 'global.styles'

injectStore(store)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            <Elements stripe={stripePromise}>
              <GlobalStyle />
              <App />
            </Elements>
          </BrowserRouter>
        </PersistGate>
      </ApolloProvider>
    </Provider>
  </React.StrictMode>
)
