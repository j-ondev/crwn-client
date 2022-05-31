import ProductCard from 'components/product-card/product-card.component'
import { Product } from 'features/categories/category.types'

import {
  CategoryPreviewContainer,
  CategoryLink,
  Preview,
} from './category-preview.styles'

const CategoryPreview = ({
  title,
  products,
}: {
  title: string
  products: Product[]
}) => {
  return (
    <CategoryPreviewContainer>
      <h2>
        <CategoryLink to={title}>{title.toUpperCase()}</CategoryLink>
      </h2>
      <Preview>
        {products
          .filter((_, idx) => idx < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </Preview>
    </CategoryPreviewContainer>
  )
}

export default CategoryPreview
