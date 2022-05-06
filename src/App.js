import { Routes, Route } from 'react-router-dom'

import Navigation from 'routes/navigation/navigation.component'
import Home from 'routes/home/home.component'
import Shop from 'routes/shop/shop.component'
import SignIn from 'routes/authentication/authentication.component'

import useGoogleLogin from 'hooks/useGoogleLogin'
import Checkout from 'routes/checkout/checkout.component'

const App = () => {
  useGoogleLogin()

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="auth" element={<SignIn />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  )
}

export default App
