import { createSlice } from '@reduxjs/toolkit'

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: [],
  },
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload
    },
  },
})

const { actions, reducer } = categorySlice

export const { setCategories } = actions
export default reducer
