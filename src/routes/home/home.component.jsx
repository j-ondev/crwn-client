import { useContext } from 'react'
import { Outlet } from 'react-router-dom'

import { CategoriesContext } from 'contexts/categories.context'

import CategoriesContainer from 'components/categories-container/categories-container.component'

const Home = () => {
  const { categories } = useContext(CategoriesContext)

  return (
    <div>
      <CategoriesContainer categories={categories} />
      <Outlet />
    </div>
  )
}

export default Home
