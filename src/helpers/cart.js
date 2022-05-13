const addCartItem = (cartItems, productToAdd) => {
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

const removeCartItem = (cartItems, productToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToRemove.id
  )

  if (existingCartItem.quantity === 1)
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id)

  return cartItems.map((cartItem) =>
    cartItem.id === productToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  )
}

const clearCartItem = (cartItems, productToRemove) =>
  cartItems.filter((cartItem) => cartItem.id !== productToRemove.id)

export const addItemToCart = (cartItems, productToAdd) =>
  addCartItem(cartItems, productToAdd)

export const removeItemFromCart = (cartItems, productToRemove) =>
  removeCartItem(cartItems, productToRemove)

export const clearItemFromCart = (cartItems, productToRemove) =>
  clearCartItem(cartItems, productToRemove)
