import { createSelector } from 'reselect'

import type { RootState } from 'app/store'
import { Product } from './category.types'

const selectCategoryReducer = (state: RootState) => state.categories

export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
)

export const selectProductsByCategory = createSelector(
  [selectCategories],
  (categories) =>
    categories.reduce<Record<string, Product[]>>((acc, category) => {
      const { title, items } = category

      acc[title.toLowerCase()] = items
      return acc
    }, {})
)

export const selectCategoriesLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.loading
)
