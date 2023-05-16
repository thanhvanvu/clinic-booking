import actionTypes from '../actions/actionTypes'

const initialState = {
  topDoctors: [],
  isLoading: true,
  currentDoctor: [],
}

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
      // always make a copy of state, never modify the initial state directly
      state.topDoctors = action.data
      state.isLoading = false

      return {
        ...state,
      }
    case actionTypes.FETCH_TOP_DOCTORS_FAILED:
      return {
        ...state,
      }

    case actionTypes.GET_CURRENT_DOCTOR_SUCCESS:
      // always make a copy of state, never modify the initial state directly
      state.currentDoctor = action.data

      return {
        ...state,
      }
    case actionTypes.GET_CURRENT_DOCTOR_FAILED:
      return {
        ...state,
      }
    default:
      return state
  }
}

export default appReducer
