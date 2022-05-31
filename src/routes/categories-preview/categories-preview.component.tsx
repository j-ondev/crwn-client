import { Fragment } from 'react'
import { useAppSelector } from 'hooks/redux'

import {
  selectProductsByCategory,
  selectCategoriesLoading,
} from 'features/categories/category.selector'

import CategoryPreview from 'components/category-preview/category-preview.component'
import Spinner from 'components/spinner/spinner.component'

const CategoriesPreview = () => {
  const categoriesMap = useAppSelector(selectProductsByCategory)
  const fetchStatus = useAppSelector(selectCategoriesLoading)

  return (
    <Fragment>
      {fetchStatus === 'pending' ? (
        <Spinner />
      ) : (
        Object.keys(categoriesMap).map((title) => {
          const products = categoriesMap[title]
          return (
            <CategoryPreview key={title} title={title} products={products} />
          )
        })
      )}
    </Fragment>
  )
}

export default CategoriesPreview
