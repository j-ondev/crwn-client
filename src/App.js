import { useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { useLazyQuery, useQuery } from '@apollo/client'

import { GET_ALL_PRODUCTS } from 'apollo/products.queries'
import { GET_ALL_CATEGORIES } from 'apollo/categories.queries'

import useGoogleLogin from 'hooks/useGoogleLogin'
import { setCategories } from 'redux/categories/category.slice'
import { getCategoryProducts } from 'helpers/products'

import Navigation from 'routes/navigation/navigation.component'
import Home from 'routes/home/home.component'
import Shop from 'routes/shop/shop.component'
import Auth from 'routes/auth/auth.component'
import Checkout from 'routes/checkout/checkout.component'

const App = () => {
  const dispatch = useDispatch()
  const [getAllProducts] = useLazyQuery(GET_ALL_PRODUCTS)

  useGoogleLogin()

  useQuery(GET_ALL_CATEGORIES, {
    onCompleted: async ({ Categories }) => {
      const {
        data: { Products: dbProducts },
      } = await getAllProducts()

      const categoriesMap = Categories.map((category) => {
        return {
          ...category,
          items: getCategoryProducts(category, dbProducts),
        }
      })

      dispatch(setCategories(categoriesMap))
    },
  })

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Auth />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  )
}

export default App
