import './cart-item.styles.scss'

const CartItem = ({ cartItem }) => {
  const { name, image_url, price, quantity } = cartItem
  return (
    <div className="cart-item-container">
      <img src={image_url} alt={name} />
      <div className="item-details">
        <span className="name">{name}</span>
        <span className="price">{`${quantity} x $${price}`}</span>
      </div>
    </div>
  )
}

export default CartItem
