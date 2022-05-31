import { useAppDispatch, useAppSelector } from 'hooks/redux'

import { selectCartItems } from 'features/cart/cart.selector'
import { setCartItems } from 'features/cart/cart.slice'
import { addItemToCart } from 'helpers/cart'

import Button, { BUTTON_TYPE_CLASSES } from 'components/button/button.component'

import {
  ProductCardContainer,
  CardPrice,
  CardName,
  CardFooter,
} from './product-card.styles'

const ProductCard = ({ product }) => {
  const dispatch = useAppDispatch()
  const cartItems = useAppSelector(selectCartItems)
  const { name, price, image_url } = product

  const addProductToCart = () =>
    dispatch(setCartItems(addItemToCart(cartItems, product)))

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
