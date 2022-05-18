import { createAsyncThunk } from '@reduxjs/toolkit'

import { apolloClient } from 'app/api'

import { GET_ALL_CATEGORIES } from 'apollo/categories.queries'
import { GET_ALL_PRODUCTS } from 'apollo/products.queries'
import { getCategoryProducts } from 'helpers/products'

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { getState }) => {
    const { loading } = getState().categories

    if (loading !== 'pending') return

    const {
      data: { Categories },
    } = await apolloClient.query({ query: GET_ALL_CATEGORIES })

    if (Categories) {
      let {
        data: { Products: dbProducts },
      } = await apolloClient.query({ query: GET_ALL_PRODUCTS })

      // eslint-disable-next-line no-unused-vars
      dbProducts = dbProducts.map(({ __typename, ...product }) => {
        return { ...product }
      })

      const categoriesMap = Categories.map(
        // eslint-disable-next-line no-unused-vars
        ({ __typename, active, ...category }) => {
          if (active === true)
            return {
              ...category,
              items: getCategoryProducts(category, dbProducts),
            }
        }
      )

      return categoriesMap
    }
  }
)
