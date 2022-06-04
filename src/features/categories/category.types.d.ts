import { SerializedError } from '@reduxjs/toolkit'

export type GqlProduct = {
  __typename: string
  id: number
  category: number
  name: string
  price: number
  image_url?: string
}

export type Product = {
  id: number
  category: number
  name: string
  price: number
  image_url?: string
}

export type GqlCategory = {
  __typename: string
  active: boolean
} & Category

export type Category = {
  id: number
  title: string
  image_url?: string
  items: Product[]
}

export type CategorySliceState = {
  readonly categories: Category[]
  readonly loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  readonly error: SerializedError | null
  readonly currentRequestId: string | undefined
}
