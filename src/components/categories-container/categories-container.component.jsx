import CategoryItem from 'components/category-item/category-item.component'
import { Link } from 'react-router-dom'

import './categories-container.styles.scss'

const CategoryContainer = ({ categories }) => {
  return (
    <div className="categories-container">
      {categories.map((category) => (
        <Link to={`shop/${category.title}`}>
          <CategoryItem key={category.id} category={category} />
        </Link>
      ))}
    </div>
  )
}

export default CategoryContainer
