import actionTypes from '../actions/actionTypes'

const initialState = {
  genders: [],
  positions: [],
  roles: [],
}

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      return {
        ...state,
      }
    case actionTypes.FETCH_GENDER_SUCCESS:
      let genderArr = action.data

      // always make a copy of state, never modify the initial state directly
      let copiedGenderState = { ...state }
      copiedGenderState.genders = genderArr

      return {
        ...copiedGenderState,
      }
    case actionTypes.FETCH_GENDER_FAILED:
      return {
        ...state,
      }

    //---------------------------------------------//
    case actionTypes.FETCH_POSITION_START:
      return {
        ...state,
      }
    case actionTypes.FETCH_POSITION_SUCCESS:
      console.log('check sucess')
      let positionArr = action.data

      // always make a copy of state, never modify the initial state directly
      let copiedPositionState = { ...state }
      copiedPositionState.positions = positionArr

      return {
        ...copiedPositionState,
      }
    case actionTypes.FETCH_POSITION_FAILED:
      return {
        ...state,
      }
    default:
      return state
  }
}

export default appReducer
