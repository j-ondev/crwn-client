import moment from 'moment'

import { RENEW_TOKEN } from 'apollo/user.queries'
import { setUser } from 'redux/user/user.slice'
import { apolloClient } from 'app/api'

export const autoLogin = (storeApi) => (next) => (action) => {
  const { user } = storeApi

  if (user) {
    const expDatetime = new Date(user.exp)
    console.log('teste 1')

    if (moment(expDatetime) <= moment().add(15, 'm')) {
      const newToken = apolloClient.mutate(RENEW_TOKEN)
      console.log('teste 2')
      storeApi.dispatch(setUser(newToken))
    }
  }

  next(action)
}
