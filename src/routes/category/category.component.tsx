import { useState, useEffect, Fragment } from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector } from 'hooks/redux'

import {
  selectProductsByCategory,
  selectCategoriesLoading,
} from 'features/categories/category.selector'

import ProductCard from 'components/product-card/product-card.component'
import Spinner from 'components/spinner/spinner.component'

import { CategoryContainer, Title } from './category.styles'

type CategoryRouteParams = {
  category: string
}

const Category = () => {
  const { category } = useParams<
    keyof CategoryRouteParams
  >() as CategoryRouteParams
  const categoriesMap = useAppSelector(selectProductsByCategory)
  const fetchStatus = useAppSelector(selectCategoriesLoading)
  const [products, setProducts] = useState(categoriesMap[category])

  useEffect(() => {
    setProducts(categoriesMap[category])
  }, [category, categoriesMap])

  return (
    <Fragment>
      <Title>{category.toUpperCase()}</Title>
      {fetchStatus === 'pending' ? (
        <Spinner />
      ) : (
        <CategoryContainer>
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </CategoryContainer>
      )}
    </Fragment>
  )
}

export default Category
