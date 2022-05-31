import { CartItem as CartItemType } from 'features/cart/cart.types'
import { CartItemContainer, ItemDetails, ItemName } from './cart-item.styles'

const CartItem = ({ cartItem }: { cartItem: CartItemType }) => {
  const { name, image_url, price, quantity } = cartItem
  return (
    <CartItemContainer>
      <img src={image_url} alt={name} />
      <ItemDetails>
        <ItemName>{name}</ItemName>
        <span className="price">{`${quantity} x $${price}`}</span>
      </ItemDetails>
    </CartItemContainer>
  )
}

export default CartItem
