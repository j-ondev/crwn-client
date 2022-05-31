import CategoryItem from 'components/category-item/category-item.component'
import { Category } from 'features/categories/category.types'

import {
  CategoriesContainer,
  CategoryLink,
} from './categories-container.styles'

const CategoryContainer = ({ categories }: { categories: Category[] }) => {
  return (
    <CategoriesContainer>
      {categories.map((category) => (
        /** Could use react-router-dom hook useNavigate instead of a link */
        <CategoryLink key={category.id} to={`shop/${category.title}`}>
          <CategoryItem key={category.id} category={category} />
        </CategoryLink>
      ))}
    </CategoriesContainer>
  )
}

export default CategoryContainer
