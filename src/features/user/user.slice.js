import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser: (_, action) => action.payload,
  },
})

const { actions, reducer } = userSlice

export const { setUser } = actions
export default reducer
