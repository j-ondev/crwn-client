import React, { ReactElement } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import { Elements } from '@stripe/react-stripe-js'
import { render as rtlRender, RenderOptions } from '@testing-library/react'
import {
  combineReducers,
  configureStore,
  EmptyObject,
  EnhancedStore,
  PreloadedState,
} from '@reduxjs/toolkit'

import userReducer from 'features/user/user.slice'
import cartReducer from 'features/cart/cart.slice'
import categoriesReducer from 'features/categories/category.slice'

import type { RootState } from 'app/store'
import { stripePromise } from './stripe/stripe.utils'
import { apolloClient } from 'app/api'

type ReducerTypes = Pick<RootState, 'cart' | 'user' | 'categories'>
type TStore = EnhancedStore<ReducerTypes>

type CustomRenderOptions = {
  preloadedState?: PreloadedState<ReducerTypes & EmptyObject>
  store?: TStore
} & Omit<RenderOptions, 'wrapper'>

function render(ui: ReactElement, options?: CustomRenderOptions) {
  const { preloadedState } = options || {}

  const reducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    categories: categoriesReducer,
  })

  const store =
    options?.store ||
    configureStore({
      reducer,
      preloadedState,
    })

  function Wrapper({ children }: { children: React.ReactNode }) {
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
  return rtlRender(ui, { wrapper: Wrapper, ...options })
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { render }
