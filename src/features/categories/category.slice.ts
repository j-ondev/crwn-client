import { createSlice } from '@reduxjs/toolkit'

import { fetchCategories } from './category.thunk'
import type { CategorySliceState } from './category.types'

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: [],
    loading: 'idle',
    error: null,
    currentRequestId: undefined,
  } as CategorySliceState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state, { meta }) => {
        const { requestId } = meta

        if (state.loading === 'idle') {
          state.loading = 'pending'
          state.error = null
          state.currentRequestId = requestId
        }
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        const { requestId } = action.meta

        if (
          state.loading === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.loading = 'idle'
          state.error = null
          state.categories = action.payload
          state.currentRequestId = undefined
        }
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        const { requestId } = action.meta

        if (
          state.loading === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.loading = 'idle'
          state.categories = []
          state.currentRequestId = undefined
          state.error = action.error
        }
      })
  },
})

export default categorySlice.reducer
