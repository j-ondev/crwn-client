import './product-card.styles.scss'

import Button from 'components/button/button.component'

const ProductCard = ({ product }) => {
  const { name, price, image_url } = product

  return (
    <div className="product-card-container">
      <img src={image_url} alt={name} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button className="inverted">ADD TO CART</Button>
    </div>
  )
}

export default ProductCard
