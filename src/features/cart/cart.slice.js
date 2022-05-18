import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    isCartOpen: false,
    cartItems: [],
  },
  reducers: {
    setIsCartOpen(state, action) {
      state.isCartOpen = action.payload
    },
    setCartItems(state, action) {
      state.cartItems = action.payload
    },
  },
})

const { actions, reducer } = cartSlice

export const { setIsCartOpen, setCartItems } = actions
export default reducer
