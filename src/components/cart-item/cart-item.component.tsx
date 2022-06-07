import { FC, memo } from 'react'
import { CartItem as TCartItem } from 'features/cart/cart.types'
import { CartItemContainer, ItemDetails, ItemName } from './cart-item.styles'

const CartItem: FC<{ cartItem: TCartItem }> = memo(({ cartItem }) => {
  const { name, image_url, price, quantity } = cartItem
  return (
    <CartItemContainer>
      <img src={image_url || 'no-image.png'} alt={name} />
      <ItemDetails>
        <ItemName>{name}</ItemName>
        <span className="price">{`${quantity} x $${price}`}</span>
      </ItemDetails>
    </CartItemContainer>
  )
})

export default CartItem
