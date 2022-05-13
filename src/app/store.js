import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'

import userReducer from 'redux/user/user.slice'
import categoriesReducer from 'redux/categories/category.slice'
import cartReducer from 'redux/cart/cart.slice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    categories: categoriesReducer,
    cart: cartReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})
