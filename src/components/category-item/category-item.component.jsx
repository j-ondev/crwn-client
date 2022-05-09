import './category-item.styles.scss'

const CategoryItem = ({ category }) => {
  const { image_url, title } = category
  return (
    <div className="category-item-container">
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${image_url})`,
        }}
      />
      <div className="body">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  )
}

export default CategoryItem
