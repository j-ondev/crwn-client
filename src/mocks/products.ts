import type { Product } from 'features/categories/category.types'

const mockProducts: Product[][] = [
  [
    {
      id: 1,
      category: 1,
      name: 'Brown Brim',
      price: 25,
      image_url: 'https://i.ibb.co/ZYW3VTp/brown-brim.png',
    },
    {
      id: 2,
      category: 1,
      name: 'Blue Beanie',
      price: 18,
      image_url: 'https://i.ibb.co/ypkgK0X/blue-beanie.png',
    },
    {
      id: 3,
      category: 1,
      name: 'Brown Cowboy',
      price: 35,
      image_url: 'https://i.ibb.co/QdJwgmp/brown-cowboy.png',
    },
  ],
  [
    {
      id: 1,
      category: 2,
      name: 'Black Jean Shearling',
      price: 125,
      image_url: 'https://i.ibb.co/XzcwL5s/black-shearling.png',
    },
    {
      id: 2,
      category: 2,
      name: 'Blue Jean Jacket',
      price: 90,
      image_url: 'https://i.ibb.co/mJS6vz0/blue-jean-jacket.png',
    },
    {
      id: 3,
      category: 2,
      name: 'Grey Jean Jacket',
      price: 90,
      image_url: 'https://i.ibb.co/N71k1ML/grey-jean-jacket.png',
    },
  ],
  [
    {
      id: 1,
      category: 3,
      name: 'Camo Down Vest',
      price: 325,
      image_url: 'https://i.ibb.co/xJS0T3Y/camo-vest.png',
    },
    {
      id: 2,
      category: 3,
      name: 'Floral T-shirt',
      price: 20,
      image_url: 'https://i.ibb.co/qMQ75QZ/floral-shirt.png',
    },
    {
      id: 3,
      category: 3,
      name: 'Black & White Longsleeve',
      price: 25,
      image_url: 'https://i.ibb.co/55z32tw/long-sleeve.png',
    },
  ],
]

export default mockProducts
