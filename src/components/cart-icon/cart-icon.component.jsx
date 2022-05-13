import { useDispatch, useSelector } from 'react-redux'

import { selectIsCartOpen, selectCartCount } from 'redux/cart/cart.selector'
import { setIsCartOpen } from 'redux/cart/cart.slice'

import { ShoppingIcon, CartIconContainer, ItemCount } from './cart-icon.styles'

const CartIcon = () => {
  const dispatch = useDispatch()
  const isCartOpen = useSelector(selectIsCartOpen)
  const cartCount = useSelector(selectCartCount)

  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen))

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon
