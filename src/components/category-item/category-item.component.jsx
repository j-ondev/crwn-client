import './category-item.styles.scss'

const CategoryItem = ({ category }) => {
  const { imageUrl, title } = category

  return (
    <div className='category-item'>
      <div className='background-image' style={{
        backgroundImage: `url(${ imageUrl })`
      }} />
      <div className='category-item-body'>
        <h2>{ title }</h2>
        <p>Shop Now</p>
      </div>
    </div>
  )
}

export default CategoryItem