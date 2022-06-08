import { combineReducers, configureStore } from '@reduxjs/toolkit'

import autoLoginMiddleware from 'features/middlewares/auto-login.middleware'
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import logger from 'redux-logger'

import categoriesReducer from 'features/categories/category.slice'
import userReducer from 'features/user/user.slice'
import cartReducer from 'features/cart/cart.slice'
import { getEnv } from 'utils/config'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
}

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    user: userReducer,
    cart: cartReducer,
    categories: categoriesReducer,
  })
)

const isDevelopment = getEnv('NODE_ENV') === 'development'

const middlewares = [autoLoginMiddleware]

if (isDevelopment) middlewares.push(logger)

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(middlewares),
})

export type TStore = typeof store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store)
export default store
