import React, { FC, ReactElement } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import { Elements } from '@stripe/react-stripe-js'
import { render, RenderOptions } from '@testing-library/react'

import { store } from 'app/store'
import { apolloClient } from 'app/api'
import { stripePromise } from './stripe/stripe.utils'

const AllTheProviders: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <Elements stripe={stripePromise}>
          <Provider store={store}>{children}</Provider>
        </Elements>
      </BrowserRouter>
    </ApolloProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
