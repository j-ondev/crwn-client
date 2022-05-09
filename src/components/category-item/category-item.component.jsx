import {
  BackgroundImage,
  Body,
  CategoryItemContainer,
} from './category-item.styles'

const CategoryItem = ({ category }) => {
  const { image_url, title } = category
  return (
    <CategoryItemContainer>
      <BackgroundImage imageUrl={image_url} />
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </CategoryItemContainer>
  )
}

export default CategoryItem
