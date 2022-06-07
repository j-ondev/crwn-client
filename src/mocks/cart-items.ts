import type { CartItem } from 'features/cart/cart.types'

const mockCartItems: CartItem[] = [
  {
    id: 1,
    category: 1,
    name: 'Brown Brim',
    price: 25,
    quantity: 1,
    image_url: 'https://i.ibb.co/ZYW3VTp/brown-brim.png',
  },
  {
    id: 2,
    category: 1,
    name: 'Blue Beanie',
    price: 18,
    quantity: 3,
    image_url: 'https://i.ibb.co/ypkgK0X/blue-beanie.png',
  },
  {
    id: 3,
    category: 1,
    name: 'Brown Cowboy',
    price: 35,
    quantity: 5,
    image_url: 'https://i.ibb.co/QdJwgmp/brown-cowboy.png',
  },
]

export default mockCartItems
