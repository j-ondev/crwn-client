import { useDispatch, useSelector } from 'react-redux'

import { selectCartItems } from 'redux/cart/cart.selector'
import { setCartItems } from 'redux/cart/cart.slice'
import {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
} from 'helpers/cart'

import './checkout-item.styles.scss'

const CheckoutItem = ({ cartItem }) => {
  const dispatch = useDispatch()
  const { name, image_url, price, quantity } = cartItem
  const cartItems = useSelector(selectCartItems)

  const addItemHandler = () =>
    dispatch(setCartItems(addItemToCart(cartItems, cartItem)))
  const removeItemHandler = () =>
    dispatch(setCartItems(removeItemFromCart(cartItems, cartItem)))
  const clearItemHandler = () =>
    dispatch(setCartItems(clearItemFromCart(cartItems, cartItem)))

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={image_url} alt={name} />
      </div>
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
      <div className="remove-button" onClick={clearItemHandler}>
        &#10005;
      </div>
    </div>
  )
}

export default CheckoutItem
