import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectCategories } from 'redux/categories/category.selector'

import CategoriesContainer from 'components/categories-container/categories-container.component'

const Home = () => {
  const categories = useSelector(selectCategories)

  return (
    <div>
      <CategoriesContainer categories={categories} />
      <Outlet />
    </div>
  )
}

export default Home
