import { Dispatch, Middleware, MiddlewareAPI } from '@reduxjs/toolkit'
import moment from 'moment'

import { RENEW_TOKEN } from 'apollo/user.queries'
import { setUser } from 'features/user/user.slice'
import { apolloClient } from 'app/api'
import { RootState } from 'app/store'

const autoLoginMiddleware: Middleware =
  ({ dispatch, getState }: MiddlewareAPI<Dispatch, RootState>) =>
  (next) =>
  async (action) => {
    if (!action.type) return next(action)

    const { user } = getState()

    if (user && action.type !== 'user/setUser') {
      const expDatetime = moment(user.exp * 1000)
      const tokenExpired = expDatetime < moment()

      if (!tokenExpired && moment() >= expDatetime.subtract(15, 'm')) {
        const {
          data: { RenewToken: newToken },
        } = await apolloClient.mutate({ mutation: RENEW_TOKEN })

        newToken.__typename !== 'UserError'
          ? dispatch(setUser(newToken))
          : dispatch(setUser(null))
      } else dispatch(setUser(null))
    }

    return next(action)
  }

export default autoLoginMiddleware
