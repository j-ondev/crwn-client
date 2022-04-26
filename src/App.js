import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import { googleLoginModal } from 'helpers/google'

import Navigation from './routes/navigation/navigation.component'
import Home from './routes/home/home.component'
import SignIn from './routes/sign-in/sign-in.component'


const App = () => {
  useEffect(googleLoginModal, [])

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='sign-in' element={<SignIn />} />
      </Route>
    </Routes>
  )
}

export default App;
