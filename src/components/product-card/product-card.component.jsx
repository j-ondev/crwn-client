import { useContext } from 'react'

import { CartContext } from 'contexts/cart.context'

import Button, { BUTTON_TYPE_CLASSES } from 'components/button/button.component'

import {
  ProductCardContainer,
  CardPrice,
  CardName,
  CardFooter,
} from './product-card.styles'

const ProductCard = ({ product }) => {
  const { name, price, image_url } = product
  const { addItemToCart } = useContext(CartContext)

  const addProductToCart = () => addItemToCart(product)

  return (
    <ProductCardContainer>
      <img src={image_url} alt={name} />
      <CardFooter>
        <CardName>{name}</CardName>
        <CardPrice>{price}</CardPrice>
      </CardFooter>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCart}
      >
        ADD TO CART
      </Button>
    </ProductCardContainer>
  )
}

export default ProductCard
