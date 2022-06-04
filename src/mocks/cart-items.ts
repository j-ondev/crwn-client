import type { CartItem } from 'features/cart/cart.types'

const mockCartItems: CartItem[] = [
  { id: 1, category: 1, name: 'Brown Brim', price: 25, quantity: 1 },
  { id: 2, category: 1, name: 'Blue Beanie', price: 18, quantity: 3 },
  { id: 3, category: 1, name: 'Brown Cowboy', price: 35, quantity: 5 },
]

export default mockCartItems
