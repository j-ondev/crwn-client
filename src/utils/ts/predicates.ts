import { QueryResultError } from 'apollo/types/apollo'
import { StripeCardElement } from '@stripe/stripe-js'

export const isApolloError = (
  entity: QueryResultError | unknown
): entity is QueryResultError =>
  (entity as QueryResultError).__typename.includes('Error')

export const isStripeCardElement = (
  card: StripeCardElement | null
): card is StripeCardElement => card !== null
