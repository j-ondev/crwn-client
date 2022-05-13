import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { setIsCartOpen } from 'redux/cart/cart.slice'
import { selectCartItems } from 'redux/cart/cart.selector'

import Button from 'components/button/button.component'

import CartItem from 'components/cart-item/cart-item.component'

import {
  CartDropdownContainer,
  EmptyMessage,
  CartItems,
} from './cart-dropdown.styles'

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems)
  const navigate = useNavigate()

  const goToCheckoutHandler = () => {
    navigate('/checkout')
    setIsCartOpen(false)
  }

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  )
}

export default CartDropdown
