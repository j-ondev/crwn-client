import { FC, memo } from 'react'
import { useAppDispatch, useAppSelector } from 'hooks/redux'

import { selectCartItems } from 'features/cart/cart.selector'
import { setCartItems } from 'features/cart/cart.slice'
import { CartItem } from 'features/cart/cart.types'
import {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
} from 'helpers/cart'

import {
  CheckoutItemContainer,
  ImageContainer,
  BaseSpan,
  Quantity,
  Arrow,
  Value,
  RemoveButton,
} from './checkout-item.styles'

const CheckoutItem: FC<{ cartItem: CartItem }> = memo(({ cartItem }) => {
  const dispatch = useAppDispatch()
  const { name, image_url, price, quantity } = cartItem
  const cartItems = useAppSelector(selectCartItems)

  const addItemHandler = () =>
    dispatch(setCartItems(addItemToCart(cartItems, cartItem)))
  const removeItemHandler = () =>
    dispatch(setCartItems(removeItemFromCart(cartItems, cartItem)))
  const clearItemHandler = () =>
    dispatch(setCartItems(clearItemFromCart(cartItems, cartItem)))

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={image_url} alt={name} />
      </ImageContainer>
      <BaseSpan>{name}</BaseSpan>
      <Quantity>
        <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={addItemHandler}>&#10095;</Arrow>
      </Quantity>
      <BaseSpan>{price}</BaseSpan>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  )
})

export default CheckoutItem
