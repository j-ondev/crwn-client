import { QueryResultError } from 'apollo/types'

export function isApolloError(
  entity: unknown | QueryResultError
): entity is QueryResultError {
  return (entity as QueryResultError).code !== undefined
}
