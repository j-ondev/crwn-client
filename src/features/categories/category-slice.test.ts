import mockCategories from 'mocks/categories'
import categoryReducer from './category.slice'
import { fetchCategories } from './category.thunk'
import type { CategorySliceState } from './category.types'

describe('[Feature - Category] Slice', () => {
  const initialState: CategorySliceState = {
    categories: [],
    loading: 'idle',
    error: null,
    currentRequestId: undefined,
  }

  const pendingState: CategorySliceState = {
    ...initialState,
    loading: 'pending',
    error: { code: 'abc', message: 'Woops...' },
    currentRequestId: '123',
  }

  it('Handle initial state', () => {
    expect(categoryReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    )
  })

  it('Set loading status to pending when action is dispatched', async () => {
    expect(
      categoryReducer(initialState, {
        type: fetchCategories.pending.type,
        meta: { requestId: '123' },
      })
    ).toEqual({
      ...initialState,
      loading: 'pending',
      currentRequestId: '123',
    })
  })

  it('Set payload to state when fulfilled', async () => {
    expect(
      categoryReducer(pendingState, {
        type: fetchCategories.fulfilled.type,
        payload: mockCategories[0],
        meta: { requestId: '123' },
      })
    ).toEqual({
      ...initialState,
      loading: 'idle',
      categories: mockCategories[0],
      currentRequestId: undefined,
      error: null,
    })
  })

  it('Set error to state when rejected', async () => {
    expect(
      categoryReducer(pendingState, {
        type: fetchCategories.rejected.type,
        error: { code: 'abc', message: 'Woops...' },
        meta: { requestId: '123' },
      })
    ).toEqual({
      ...initialState,
      loading: 'idle',
      categories: [],
      currentRequestId: undefined,
      error: { code: 'abc', message: 'Woops...' },
    })
  })
})
