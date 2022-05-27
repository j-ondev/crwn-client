import type { Product } from '../categories/category.types'

export type CartItem = {
  readonly quantity: number
} & Product

export type CartSliceState = {
  readonly isCartOpen: boolean
  readonly cartItems: CartItem[]
}
