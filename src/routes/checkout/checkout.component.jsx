import { useContext } from 'react'

import { CartContext } from 'contexts/cart.context'

import CheckoutItem from 'components/checkout-item/checkout-item.component'

import './checkout.styles.scss'

const Checkout = () => {
  const { cartItems } = useContext(CartContext)

  const cartSubtotal = cartItems.reduce(
    (subtotal, cartItem) => subtotal + cartItem.price * cartItem.quantity,
    0
  )

  return (
    // I'd prefer using a table for this,
    // but in this case i'll follow the course
    // to avoid more discrepancy
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((cartItem) => {
        return <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      })}
      <span className="subtotal">{`Subtotal: $${cartSubtotal}`}</span>
    </div>
  )
}

export default Checkout
