import { createSlice } from '@reduxjs/toolkit'
import { fetchCategories } from './category.thunk'

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: [],
    loading: 'idle',
    error: null,
    currentRequestId: undefined,
  },
  extraReducers: {
    [fetchCategories.pending]: (state, action) => {
      const { requestId } = action.meta

      if (state.loading === 'idle') {
        state.loading = 'pending'
        state.error = null
        state.currentRequestId = requestId
      }
    },
    [fetchCategories.fulfilled]: (state, action) => {
      const { requestId } = action.meta

      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle'
        state.error = null
        state.categories = action.payload
        state.currentRequestId = undefined
      }
    },
    [fetchCategories.rejected]: (state, action) => {
      const { requestId } = action.meta

      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle'
        state.error = action.error
        state.categories = []
        state.currentRequestId = undefined
      }
    },
  },
})

export default categorySlice.reducer
