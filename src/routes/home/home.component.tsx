import { Outlet } from 'react-router-dom'
import { useAppSelector } from 'hooks/redux'

import { selectCategories } from 'features/categories/category.selector'

import CategoriesContainer from 'components/categories-container/categories-container.component'

const Home = () => {
  const categories = useAppSelector(selectCategories)

  return (
    <div>
      <CategoriesContainer categories={categories} />
      <Outlet />
    </div>
  )
}

export default Home
