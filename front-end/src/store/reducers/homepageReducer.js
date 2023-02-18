import actionTypes from '../actions/actionTypes'

const initialState = {
  topDoctors: [],
}

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
      // always make a copy of state, never modify the initial state directly

      state.topDoctors = action.data

      return {
        ...state,
      }
    case actionTypes.FETCH_TOP_DOCTORS_FAILED:
      return {
        ...state,
      }
    default:
      return state
  }
}

export default appReducer
