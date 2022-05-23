export const setThunkState = (state, action, payloadKey = null) => {
  const { requestId } = action.meta
  const { payload, error } = action
  const { loading, currentRequestId } = state

  if (loading === 'idle' && !action.payload && !action.error)
    return {
      loading: 'pending',
      error: null,
      currentRequestId: requestId,
      ...state,
    }
  else if (
    loading === 'pending' &&
    currentRequestId === requestId &&
    payload &&
    !error
  )
    return {
      loading: 'idle',
      error: null,
      currentRequestId: undefined,
      [payloadKey]: payload,
      ...state,
    }
  else if (loading === 'pending' && currentRequestId === requestId && error)
    return {
      loading: 'idle',
      error,
      currentRequestId: undefined,
      [payloadKey]: payload,
    }
  else {
    return {
      loading: 'idle',
      error: 'INTERNAL ERROR: Failed to execute requested action.',
      ...state,
    }
  }
}
