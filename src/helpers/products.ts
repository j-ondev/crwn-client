/**
 * Since PG is different from Firebase,
 * I created these functions to convert
 * GraphQL data to match the same structure.
 */

import { Category, Product } from 'features/categories/category.types'

export const getCategoryProducts = (category: Category, products: Product[]) =>
  products.filter((product) => category.id === product.category)

export const getProductsByCategory = (
  categories: Category[],
  products: Product[]
) => {
  const productsList: Record<string, Product[]> = {}

  categories.map(
    (category) =>
      (productsList[category.title] = products.filter(
        (product) => product.category === category.id
      ))
  )

  return productsList
}
