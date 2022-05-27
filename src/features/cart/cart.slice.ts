import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { CartItem, CartSliceState } from './cart.types'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    isCartOpen: false,
    cartItems: [],
  } as CartSliceState,
  reducers: {
    setIsCartOpen(state, action: PayloadAction<boolean>) {
      state.isCartOpen = action.payload
    },
    setCartItems(state, action: PayloadAction<CartItem[]>) {
      state.cartItems = action.payload
    },
  },
})

const { actions, reducer } = cartSlice

export const { setIsCartOpen, setCartItems } = actions
export default reducer
