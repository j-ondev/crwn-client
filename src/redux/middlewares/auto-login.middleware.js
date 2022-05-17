/* eslint-disable no-unused-vars */
import moment from 'moment'

import { RENEW_TOKEN } from 'apollo/user.queries'
import { setUser } from 'redux/user/user.slice'
import { apolloClient } from 'app/api'

const autoLogin =
  ({ getState, dispatch }) =>
  (next) =>
  (action) => {
    // const { user } = getState()

    // if (user) {
    //   const expDatetime = moment(user.exp * 1000)
    //   const tokenExpired = expDatetime < moment()

    //   if (!tokenExpired && moment() >= expDatetime.subtract(15, 'm')) {
    //     console.log('NOT EXPIRED')
    //     const newToken = apolloClient.mutate(RENEW_TOKEN)
    //     dispatch(setUser(newToken))
    //   } else {
    //     // I saw this in a different post and tried, but still no resolutions:
    //     // return dispatch(setUser(null)).then(() => next(action))
    //     console.log('DISPATCHING')
    //     dispatch(setUser(null))
    //     console.log('DISPATCH COMPLETE')
    //   }
    // }

    return next(action)
  }

export default autoLogin
