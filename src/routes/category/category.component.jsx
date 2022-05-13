import { useState, useEffect, Fragment } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectProductsByCategory } from 'redux/categories/category.selector'

import ProductCard from 'components/product-card/product-card.component'

import { CategoryContainer, Title } from './category.styles'

const Category = () => {
  const { category } = useParams()
  const categoriesMap = useSelector(selectProductsByCategory)
  const [products, setProducts] = useState(categoriesMap[category])

  useEffect(() => {
    setProducts(categoriesMap[category])
  }, [category, categoriesMap])

  return (
    <Fragment>
      <Title>{category.toUpperCase()}</Title>
      <CategoryContainer>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </CategoryContainer>
    </Fragment>
  )
}

export default Category
