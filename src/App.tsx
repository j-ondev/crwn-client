import { useEffect, lazy, Suspense } from 'react'
import { useAppDispatch } from 'hooks/redux'
import { Routes, Route } from 'react-router-dom'

import useGoogleLogin from 'hooks/useGoogleLogin'
import Spinner from 'components/spinner/spinner.component'
import { fetchCategories } from 'features/categories/category.thunk'

const Home = lazy(() => import('routes/home/home.component'))
const Auth = lazy(() => import('routes/auth/auth.component'))
const Shop = lazy(() => import('routes/shop/shop.component'))
const Checkout = lazy(() => import('routes/checkout/checkout.component'))
const Navigation = lazy(() => import('routes/navigation/navigation.component'))

const App = () => {
  const dispatch = useAppDispatch()

  useGoogleLogin()

  useEffect(() => {
    const fetchAsyncEffect = async () => {
      const result = await dispatch(fetchCategories())

      if (fetchCategories.rejected.match(result) && !result.payload)
        return alert(result.error.message)
    }

    fetchAsyncEffect()
  })

  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop/*" element={<Shop />} />
          <Route path="auth" element={<Auth />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
