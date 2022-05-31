import { useAppDispatch, useAppSelector } from 'hooks/redux'

import { selectIsCartOpen, selectCartCount } from 'features/cart/cart.selector'
import { setIsCartOpen } from 'features/cart/cart.slice'

import { ShoppingIcon, CartIconContainer, ItemCount } from './cart-icon.styles'

const CartIcon = () => {
  const dispatch = useAppDispatch()
  const isCartOpen = useAppSelector(selectIsCartOpen)
  const cartCount = useAppSelector(selectCartCount)

  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen))

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon
