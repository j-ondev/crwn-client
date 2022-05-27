export type QueryResultError = {
  __typename: 'UserError'
  code: string
  message?: string
}

export type UserToken = {
  __typename: 'JsonWebToken'
  access_token: string
  exp: number
}
