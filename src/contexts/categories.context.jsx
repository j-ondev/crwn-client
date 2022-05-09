import { createContext, useState } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'

import { GET_ALL_PRODUCTS } from 'graphql/products.queries'
import { GET_ALL_CATEGORIES } from 'graphql/categories.queries'
import { getProductsByCategory } from 'helpers/products'

export const CategoriesContext = createContext({
  categories: {},
  categoriesMap: {},
})

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([])
  const [categoriesMap, setCategoriesMap] = useState({})
  const [getAllProducts] = useLazyQuery(GET_ALL_PRODUCTS)

  useQuery(GET_ALL_CATEGORIES, {
    onCompleted: async ({ Categories }) => {
      setCategories(Categories)

      const {
        data: { Products: dbProducts },
      } = await getAllProducts()

      setCategoriesMap(getProductsByCategory(Categories, dbProducts))
    },
  })

  const value = { categories, categoriesMap }

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  )
}
