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
