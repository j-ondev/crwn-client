import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from 'hooks/redux'

import { setIsCartOpen } from 'features/cart/cart.slice'
import { selectCartItems } from 'features/cart/cart.selector'

import Button from 'components/button/button.component'
import CartItem from 'components/cart-item/cart-item.component'

import {
  CartDropdownContainer,
  EmptyMessage,
  CartItems,
} from './cart-dropdown.styles'

const CartDropdown = () => {
  const cartItems = useAppSelector(selectCartItems)
  const navigate = useNavigate()

  const goToCheckoutHandler = useCallback(() => {
    navigate('/checkout')
    setIsCartOpen(false)
  }, [])

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
