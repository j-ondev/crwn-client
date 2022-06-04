import { combineReducers, configureStore } from '@reduxjs/toolkit'

// import autoLoginMiddleware from 'features/middlewares/auto-login.middleware'
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
// import logger from 'redux-logger'

import userReducer from 'features/user/user.slice'
import cartReducer from 'features/cart/cart.slice'
import categoriesReducer from 'features/categories/category.slice'

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

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }) /* .concat(logger, autoLoginMiddleware) */,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store)
export default store
