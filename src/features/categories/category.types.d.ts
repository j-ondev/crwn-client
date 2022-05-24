import { SerializedError } from '@reduxjs/toolkit'

export type Product = {
  __typename?: string
  id: number
  category: number
  name: string
  price: number
  image_url: string
}

export type Category = {
  __typename?: string
  id: number
  title: string
  image_url: string
  items: Product[]
  active?: boolean
}

export type CategorySliceState = {
  categories: Category[]
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: SerializedError | null
  currentRequestId: string | undefined
}
