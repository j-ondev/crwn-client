import { Routes, Route } from 'react-router-dom'

import Navigation from './routes/navigation/navigation.component'
import Home from './routes/home/home.component'
import SignIn from './routes/authentication/authentication.component'
import useGoogleLogin from 'hooks/useGoogleLogin'

const App = () => {
  useGoogleLogin()

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="auth" element={<SignIn />} />
      </Route>
    </Routes>
  )
}

export default App
