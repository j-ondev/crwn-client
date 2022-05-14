import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import logger from 'redux-logger'

import userReducer from 'redux/user/user.slice'
import categoriesReducer from 'redux/categories/category.slice'
import cartReducer from 'redux/cart/cart.slice'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    user: userReducer,
    categories: categoriesReducer,
    cart: cartReducer,
  })
)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
})

export const persistor = persistStore(store)
