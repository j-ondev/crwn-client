import type { Category } from 'features/categories/category.types'
import mockProducts from './products'

const mockCategories: Category[] = [
  {
    id: 1,
    title: 'hats',
    image_url: 'https://i.ibb.co/cvpntL1/hats.png',
    items: mockProducts[0],
  },
  {
    id: 2,
    title: 'jackets',
    image_url: 'https://i.ibb.co/px2tCc3/jackets.png',
    items: mockProducts[1],
  },
  {
    id: 3,
    title: 'mens',
    image_url: 'https://i.ibb.co/R70vBrQ/men.png',
    items: mockProducts[2],
  },
]

export default mockCategories
