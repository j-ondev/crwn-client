import { CartItem } from 'features/cart/cart.types'

const addCartItem = (cartItems: CartItem[], productToAdd: CartItem) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  )

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    )
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }]
}

const removeCartItem = (cartItems: CartItem[], productToRemove: CartItem) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToRemove.id
  )

  if (existingCartItem?.quantity === 1)
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id)

  return cartItems.map((cartItem) =>
    cartItem.id === productToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  )
}

const clearCartItem = (cartItems: CartItem[], productToRemove: CartItem) =>
  cartItems.filter((cartItem) => cartItem.id !== productToRemove.id)

export const addItemToCart = (cartItems: CartItem[], productToAdd: CartItem) =>
  addCartItem(cartItems, productToAdd)

export const removeItemFromCart = (
  cartItems: CartItem[],
  productToRemove: CartItem
) => removeCartItem(cartItems, productToRemove)

export const clearItemFromCart = (
  cartItems: CartItem[],
  productToRemove: CartItem
) => clearCartItem(cartItems, productToRemove)
