import { gql } from '@apollo/client'

export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts {
    Products {
      id
      category
      name
      price
      image_url
    }
  }
`
