import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { UserSliceState } from './user.types'

const userSlice = createSlice({
  name: 'user',
  initialState: null as UserSliceState,
  reducers: {
    setUser: (_, action: PayloadAction<UserSliceState>) => action.payload,
  },
})

const { actions, reducer } = userSlice

export const { setUser } = actions
export default reducer
