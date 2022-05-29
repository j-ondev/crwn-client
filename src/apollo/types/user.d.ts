import type { QueryResultError } from './apollo'

export type BasicUser = {
  id: number
  display_name: string
  email: string
}

export type User = {
  googleid?: number
  password: string
  created_at: Date
  updated_at: Date
} & BasicUser

export type UserToken = {
  __typename: 'JsonWebToken'
  access_token: string
  exp: number
}

export type UserArray = {
  __typename: 'UserArray'
  users: User[]
}

export type UserInputResult = UserToken | QueryResultError
export type UserResult = User | QueryResultError
export type UserArrayResult = UserArray | QueryResultError
