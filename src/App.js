import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

import useGoogleLogin from 'hooks/useGoogleLogin'
import { fetchCategories } from 'features/categories/category.thunk'

import Navigation from 'routes/navigation/navigation.component'
import Home from 'routes/home/home.component'
import Shop from 'routes/shop/shop.component'
import Auth from 'routes/auth/auth.component'
import Checkout from 'routes/checkout/checkout.component'

const App = () => {
  const dispatch = useDispatch()

  useGoogleLogin()

  useEffect(() => {
    const result = dispatch(fetchCategories())

    if (fetchCategories.rejected.match(result) && !result.payload)
      alert(result.error.message)
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
