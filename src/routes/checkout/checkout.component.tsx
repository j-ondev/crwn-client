import { useAppSelector } from 'hooks/redux'
import {
  selectCartItems,
  selectCartSubtotal,
} from 'features/cart/cart.selector'

import CheckoutItem from 'components/checkout-item/checkout-item.component'
import PaymentForm from 'components/payment-form/payment-form.component'

import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Subtotal,
} from './checkout.styles'

const Checkout = () => {
  const cartItems = useAppSelector(selectCartItems)
  const cartSubtotal = useAppSelector(selectCartSubtotal)

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
      <PaymentForm />
    </CheckoutContainer>
  )
}

export default Checkout
