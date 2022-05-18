import { useSelector } from 'react-redux'
import {
  selectCartItems,
  selectCartSubtotal,
} from 'features/cart/cart.selector'

import CheckoutItem from 'components/checkout-item/checkout-item.component'

import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Subtotal,
} from './checkout.styles'

const Checkout = () => {
  const cartItems = useSelector(selectCartItems)
  const cartSubtotal = useSelector(selectCartSubtotal)

  return (
    // I'd prefer using a table for this,
    // but in this case i'll follow the course
    // to avoid more discrepancy
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Remove</span>
        </HeaderBlock>
      </CheckoutHeader>
      {cartItems.map((cartItem) => {
        return <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      })}
      <Subtotal>{`Subtotal: $${cartSubtotal}`}</Subtotal>
    </CheckoutContainer>
  )
}

export default Checkout
