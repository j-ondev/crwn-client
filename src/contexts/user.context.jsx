import { createContext, useState } from 'react'

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
})

export const UserProvider = ({ children }) => {
  const token = JSON.parse(localStorage.getItem('accessToken'))

  const [currentUser, setCurrentUser] = useState(token)
  const value = { currentUser, setCurrentUser }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
