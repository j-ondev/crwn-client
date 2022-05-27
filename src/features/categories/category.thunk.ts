import { createAsyncThunk } from '@reduxjs/toolkit'

import { apolloClient } from 'app/api'

import { GET_ALL_CATEGORIES } from 'apollo/categories.queries'
import { GET_ALL_PRODUCTS } from 'apollo/products.queries'

import type { GqlCategory, Category, GqlProduct } from './category.types'
import { getCategoryProducts } from 'helpers/products'
import { RootState } from 'app/store'

export const fetchCategories = createAsyncThunk<
  Category[],
  undefined,
  { state: RootState }
>('categories/fetchCategories', async (_, { getState, requestId }) => {
  const { currentRequestId, loading } = getState().categories

  if (loading !== 'pending' || requestId !== currentRequestId) return

  const {
    data: { Categories },
  } = await apolloClient.query({ query: GET_ALL_CATEGORIES })

  if (Categories) {
    let {
      data: { Products: dbProducts },
    } = await apolloClient.query({ query: GET_ALL_PRODUCTS })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    dbProducts = dbProducts.map(({ __typename, ...product }: GqlProduct) => {
      return { ...product }
    })

    const categoriesMap = Categories.map(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ({ __typename, active, ...category }: GqlCategory) => {
        if (active === true)
          return {
            ...category,
            items: getCategoryProducts(category, dbProducts),
          }
      }
    )

    return categoriesMap
  }
})
