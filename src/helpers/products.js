/**
 * Since PG is different from Firebase,
 * I created these functions to convert
 * GraphQL data to match the same structure.
 */

export const getCategoryProducts = (category, products) =>
  products.filter((product) => category.id === product.category)

export const getProductsByCategory = (categories, products) => {
  const productsList = {}

  categories.map((category) => {
    if (category.active)
      productsList[category.title] = products.filter(
        (product) => product.category === category.id
      )
  })

  return productsList
}
