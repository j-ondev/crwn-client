import { useContext } from 'react'

import { CartContext } from 'contexts/cart.context'

import Button from 'components/button/button.component'

import './product-card.styles.scss'

const ProductCard = ({ product }) => {
  const { name, price, image_url } = product
  const { addItemToCart } = useContext(CartContext)

  const addProductToCart = () => addItemToCart(product)

  return (
    <div className="product-card-container">
      <img src={image_url} alt={name} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button className="inverted" onClick={addProductToCart}>
        ADD TO CART
      </Button>
    </div>
  )
}

export default ProductCard