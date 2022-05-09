import ProductCard from 'components/product-card/product-card.component'

import {
  CategoryPreviewContainer,
  CategoryLink,
  Preview,
} from './category-preview.styles'

const CategoryPreview = ({ title, products }) => {
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
