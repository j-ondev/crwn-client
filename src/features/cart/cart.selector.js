import { createSelector } from 'reselect'

const selectCartReducer = (state) => state.cart

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen
)

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
)

export const selectCartSubtotal = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (subtotal, cartItem) => subtotal + cartItem.quantity * cartItem.price,
      0
    )
)

export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
)
