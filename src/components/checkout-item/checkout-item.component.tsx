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
  RemoveButton,
} from './checkout-item.styles'

const CheckoutItem = ({ cartItem }: { cartItem: CartItem }) => {
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
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={removeItemHandler}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={addItemHandler}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  )
}

export default CheckoutItem
